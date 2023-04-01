const express = require('express')
const router = express.Router()
const utils = require('@helpers/utils')
const UserRole = require('@controllers/user_roles')
const checkAuth = require('@middlewares/dto/is_valid_user')
const { handleRenderer, handleDatabase } = require('@helpers/handlers/response')
const programMenu = require('@config/program/menu-en.json')

router
    .get('/user_roles', checkAuth, (req, res, next) => {
        const pages = {
            runPage: 'pages/user-role-list',
            runProgram: 'administrative.role.list',
            runContent: 'system-role.list',
        }
        handleRenderer(req.user, pages, res)
    })
    .get('/user_role/:id?', checkAuth, async (req, res, next) => {
        const id = req.params.id
        const initProgram = JSON.parse(JSON.stringify(programMenu))
        let data = { data: { program: initProgram } } // new entry

        if (id) {
            // edit role
            data = await UserRole.findDataById(id)
            const userProgram = data.data.program

            data.data.program = initProgram.map((initMenu) => {
                const findMenu = userProgram.find(
                    (userMenu) => userMenu.menuid == initMenu.menuid
                )

                let subMenuMap

                if (findMenu) {
                    subMenuMap = initMenu.submenu.map((initSubMenu) => {
                        const findSubMenu = findMenu.submenu.find(
                            (userSubMenu) =>
                                userSubMenu.menuid == initSubMenu.menuid
                        )
                        return { ...initSubMenu, ...findSubMenu }
                    })
                }
                return { ...initMenu, ...findMenu, submenu: subMenuMap }
            })
        }

        const pages = {
            data: data.data,
            runPage: 'pages/user-role-entry',
            runProgram: 'administrative.role.entry',
            runContent: 'system-role.entry',
        }

        handleRenderer(req.user, pages, res)
    })
    .post('/user_role', (req, res, next) => {
        const getService = UserRole.addData(req.body)
        handleDatabase(getService, utils.isEmptyObject, res)
    })
    .put('/user_role/:id?', (req, res, next) => {
        const { ['id']: rmId, ...data } = req.body
        const getService = UserRole.updateData(rmId, data)
        handleDatabase(getService, utils.isEmptyObject, res)
    })

module.exports = router
