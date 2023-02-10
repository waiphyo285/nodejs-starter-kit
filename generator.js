const fs = require("fs");
const fsx = require("fs-extra");
const express = require("express");
const router = express.Router();
const pluralize = require("pluralize");
const beautify = require("js-beautify").js;
const utils = require("@helpers/utils");
const clr = require("@helpers/config/log_color");

const newTemplate = (req, res, next) => {
  const bodyData = req.body.data;
  const templateName = req.params.name || "test";
  const renderPage = req.query.is_page || false;
  const propData = bodyData.data || {};
  const menuData = bodyData.menu || {};

  console.log("Tempalte Name", templateName)
  console.log("Render Page", renderPage)
  console.log("propData", propData)
  console.log("menuData", menuData)

  const templateString = templateName.split("_").join(" ");
  const templateCamel = utils.toCamelCase(templateString);
  const templateNames = pluralize(templateName);
  const templateCamels = pluralize(templateCamel);

  const checkData =
    !Object.keys(propData).length ||
    (renderPage && !Object.keys(menuData).length);

  if (checkData) {
    return res.send({
      status: "400",
      data: "Need model properties.",
    });
  }

  const configPath = {
    model: [
      `./generator/model.js`,
      `./models/mongodb/schemas/${templateName}.js`,
    ],
    controller: [
      `./generator/controller`,
      `./controllers/${templateNames}`,
      `./controllers/${templateNames}/mongod/index.js`,
    ],
    api: [
      `./generator/api.js`,
      `./src/routes/api/v1/${templateName}.js`,
    ],
    route: [
      `./generator/route.js`,
      `./src/routes/api/v1/index.js`
    ],
    page: [
      `./generator/page.js`,
      `./src/routes/pages/${templateName}.js`,
    ],
  };

  copyFile({
    origPath: configPath.model[0],
    destFile: configPath.model[1],
    regexStr: /Schema\(\)|generator/gi,
    mapObj: {
      "Schema()": `Schema(${JSON.stringify({
        ...propData,
        created_at: { type: "Date" },
        updated_at: { type: "Date" },
      })})`,
      generator: templateName,
    },
  });

  copyFolder({
    origPath: configPath.controller[0],
    destPath: configPath.controller[1],
    destFile: configPath.controller[2],
    regexStr: /Controller|generator/gi,
    mapObj: {
      Controller: utils.toTitleCase(templateName, "_", ""),
      generator: templateName,
    },
  });

  copyFile({
    origPath: configPath.api[0],
    destFile: configPath.api[1],
    regexStr: /genExport|genDatabase|generators/gi,
    mapObj: {
      genExport: templateCamel,
      genDatabase: templateCamels + "Db",
      generators: templateNames,
    },
  });

  replaceFile({
    origPath: configPath.route[0],
    destFile: configPath.route[1],
    regexStr: /generator|routing|routings|routes/gi,
    mapObj: {
      generator: templateName,
      routes: templateCamels,
      routing: templateName,
      routings: templateNames,
    },
  });

  if (renderPage) {
    copyFile({
      origPath: configPath.page[0],
      destFile: configPath.page[1],
      regexStr:
        /routing|routings|runnerPage|genDatabase|generators|menuList|menuEntry/gi,
      mapObj: {
        routing: templateName,
        routings: templateNames,
        runnerPage: templateName.split("_").join("-"),
        genDatabase: templateCamels + "Db",
        generators: templateNames,
        menuList: menuData.list,
        menuEntry: menuData.entry,
      },
    });
  }
  res.send({
    status: "200",
    data: "A new template is generated.",
  });
};

const copyFile = (params) => {
  const { origPath, destFile } = params;
  fs.copyFile(origPath, destFile, (err) => {
    if (err) throw err;
    console.log(`${clr.fg.cyan}GEN: 📝 ${origPath} is copied`);
    console.log(`${clr.fg.cyan}GEN: 📝 ${destFile} is pasted`);
    readFile(params);
  });
};

const copyFolder = (params) => {
  const { origPath, destPath } = params;
  fsx.copy(origPath, destPath, (err) => {
    if (err) throw err;
    console.log(`${clr.fg.cyan}GEN: 📝 ${origPath} is copied`);
    console.log(`${clr.fg.cyan}GEN: 📝 ${destPath} is pasted`);
    readFile(params);
  });
};

const readFile = (params) => {
  const { destFile, regexStr, mapObj } = params;
  fs.readFile(destFile, "utf8", (err, data) => {
    if (err) throw err;
    console.log(`${clr.fg.cyan}GEN: 📝 ${destFile} is read`);
    const content = data.replace(regexStr, (matched) => mapObj[matched]);
    writeFile({ destFile, content });
  });
};

const writeFile = ({ destFile, content }) => {
  fs.writeFile(
    destFile,
    beautify(content, { indent_size: 2, space_in_empty_paren: true }),
    (err) => {
      if (err) throw err;
      console.log(`${clr.fg.cyan}GEN: 📝 ${destFile} is saved`);
    }
  );
};

const replaceFile = (params) => {
  const { origPath, destFile, regexStr, mapObj } = params;
  fs.readFile(origPath, "utf8", (err, data) => {
    if (err) throw err;
    console.log(`${clr.fg.cyan}GEN: 📝 ${origPath} is read`);
    const content = data.replace(regexStr, (matched) => mapObj[matched]);
    appendFile({ destFile, content });
  });
};

const appendFile = ({ destFile, content }) => {
  fs.appendFile(
    destFile,
    beautify(content, {
      indent_size: 2,
      space_in_empty_paren: true,
    }),
    (err) => {
      if (err) throw err;
      console.log(`${clr.fg.cyan}GEN: 📝 ${destFile} is appended`);
    }
  );
};

router.post("/d-mar/new-template/:name", newTemplate);

module.exports = router;
