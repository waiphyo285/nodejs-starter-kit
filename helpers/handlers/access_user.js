const path = require('path')
const UserRole = require('@controllers/user_roles')

const getMenuPath = (locale) => {
    const menuConfig = {
        en_US: `../../config/program/menu-en.json`,
        my_MM: `../../config/program/menu-my.json`,
    }

    return menuConfig[locale || 'my_MM']
}

const getProgram = async (user, pageId) => {
    const userRole = user.role
    const userLocales = user.locale
    const splitPageId = pageId.split('.')

    const programMenu = path.resolve(__dirname, getMenuPath(userLocales))
    const initProgram = JSON.parse(JSON.stringify(require(programMenu)))

    // developer account
    if (userRole === 'developer') {
        const developerProgram = initProgram.map((initMenu) => {
            initMenu.access = true
            initMenu.active = initMenu.menuid == splitPageId[0] && true
            initMenu.submenu = initMenu.submenu.map((initSubMenu) => {
                initSubMenu.read = true
                initSubMenu.edit = true
                initSubMenu.delete = true
                initSubMenu.access = true
                initSubMenu.active =
                    initSubMenu.menuid == splitPageId[1] && true
                return initSubMenu
            })

            return initMenu
        })

        return {
            program: developerProgram,
            page: getPageData(developerProgram, pageId),
        }
    }

    // other account based on role & level
    else {
        const data = await UserRole.findDataById(user.levelid)
        const userProgram = data.data.program

        const curUserProgram = initProgram.map((initMenu) => {
            const findMenu = userProgram.find(
                (userMenu) => userMenu.menuid == initMenu.menuid
            )

            findMenu.active = findMenu.menuid == splitPageId[0] && true

            let subMenuMap

            if (findMenu) {
                subMenuMap = initMenu.submenu.map((initSubMenu) => {
                    const findSubMenu = findMenu.submenu.find(
                        (userSubMenu) =>
                            userSubMenu.menuid == initSubMenu.menuid
                    )

                    findSubMenu.active =
                        findSubMenu.menuid == splitPageId[1] && true
                    return { ...initSubMenu, ...findSubMenu }
                })
            }
            return {
                ...initMenu,
                ...findMenu,
                submenu: subMenuMap,
            }
        })

        return {
            program: curUserProgram,
            page: getPageData(curUserProgram, pageId),
        }
    }
}

const getPageData = (getProgramMenu, getPageId) => {
    if (getPageId !== undefined) {
        const splitPageId = getPageId.split('.')

        const pageMenuObj = getProgramMenu.find(
            (menu) => menu.menuid == splitPageId[0]
        )

        const pageSubMenu = pageMenuObj.submenu.find(
            (submenu) => submenu.menuid == splitPageId[1]
        )

        return { ...pageSubMenu, active: true }
    }
    return
}

module.exports = { getProgram }
