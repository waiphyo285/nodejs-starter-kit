const programMenu = require("../../config/program-menu.json");
const programAccess = require("../../config/program-access.json");

const getProgram = (userRole, pageId) => {
  const activeMenuArr = pageId.split(".");
  const programMenuJson = JSON.parse(JSON.stringify(programMenu));

  const roleAcess = Object.entries(programAccess).find(
    ([key, value]) => key == userRole
  );

  // admin role *
  if (roleAcess && typeof roleAcess[1] === "string") {
    programMenuJson.forEach((menuObj, menuIdx) => {
      // have access all 
      // menu access true
      menuObj.access = true;
      // menu active true
      menuObj.active = activeMenuArr[0] == menuObj.menuid ? true : false;

      if (menuObj.submenu && menuObj.submenu.length > 0) {
        menuObj.submenu.forEach((subMenuObj, subMenuIdx) => {
          // submenu access true
          subMenuObj.access = true;
          // split submenu action
          subMenuObj.actions = subMenuObj.actions.split(",");
          // submenu active true
          subMenuObj.active =
            activeMenuArr[1] == subMenuObj.menuid ? true : false;
        });
      }
    });

    console.log(programMenuJson[1])

    return {
      program: programMenuJson,
      page: getPageData(programMenuJson, pageId),
    };
  }

  // manager or basic role
  if (roleAcess && typeof roleAcess[1] === "object") {
    programMenuJson.forEach((menuObj, subMenuIdx) => {
      // have access some 
      if (roleAcess[1].menu.includes(menuObj.menuid)) {
        // menu access true
        menuObj.access = true;
        // menu active true
        menuObj.active = activeMenuArr[0] == menuObj.menuid ? true : false;
      }

      if (menuObj.submenu && menuObj.submenu.length > 0) {
        menuObj.submenu.forEach((subMenuObj, subMenuIdx) => {
          const subMenuAccess = roleAcess[1].submenu.find(
            (subMenuAccessStr, subMenuAccessIdx) =>
              subMenuAccessStr.includes(subMenuObj.menuid) == true
          );
          if (subMenuAccess) {
            // submenu access true
            subMenuObj.access = true;
            // split submenu action
            subMenuObj.actions = subMenuAccess.split(",").slice(1);
            // submenu active true
            subMenuObj.active =
              activeMenuArr[1] == subMenuObj.menuid ? true : false;
          }
        });
      }
    });

    return {
      program: programMenuJson,
      page: getPageData(programMenuJson, pageId),
    };
  }

  return;
};

const getPageData = (getProgramMenu, getPageId) => {
  if (getPageId !== undefined) {
    getPageId = getPageId.split(".");

    const pageObj = Object.entries(getProgramMenu).reduce(
      (pageObj, [key, value]) => {
        if (value.menuid == getPageId[0]) {
          // check Menu
          pageObj = value.submenu.find(
            (subMenuObj) => subMenuObj.menuid == getPageId[1]
          );
        }
        return pageObj;
      },
      {}
    );

    return pageObj;
  }

  return;
};

module.exports = { getProgram };
