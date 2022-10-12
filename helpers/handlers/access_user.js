const programMenu = require("../../config/program-menu.json");
const userRolesDb = require("../../controllers/user_roles");

const getProgram = async (user, pageId) => {
  const userRole = user.role;
  const splitPageId = pageId.split(".");
  const programMenuJson = JSON.parse(JSON.stringify(programMenu));

  // developer account 
  if (userRole === "developer") {
    // mapping to set true access & active all menu item
    const developerProgram = programMenuJson.map((initMenu) => {
      initMenu.access = true;
      initMenu.active = initMenu.menuid == splitPageId[0] && true;
      // mapping to set true read, edit, del & active all submeu 
      initMenu.submenu = initMenu.submenu.map((initSubMenu) => {
        initSubMenu.read = true;
        initSubMenu.edit = true;
        initSubMenu.delete = true;
        initSubMenu.active = initSubMenu.menuid == splitPageId[1] && true;
        return initSubMenu;
      });
      return initMenu;
    });

    return {
      program: developerProgram,
      page: getPageData(developerProgram, pageId),
    };
  }

  // other account based on role & level
  else {
    const data = await userRolesDb.findData("id", user.levelid);
    const userProgram = data.data.program;
    console.log("Map me ", userProgram)
  }

  return;
};

const getPageData = (getProgramMenu, getPageId) => {
  if (getPageId !== undefined) {
    const splitPageId = getPageId.split(".");
    const pageMenuObj = getProgramMenu.find((menu) => menu.menuid == splitPageId[0])
    const pageSubMenu = pageMenuObj.submenu.find((submenu) => submenu.menuid == splitPageId[1])
    return { ...pageSubMenu, active: true };
  }
  return;
};

module.exports = { getProgram };
