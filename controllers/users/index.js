const {
    listUsers,
    findUserById,
    addUser,
    updateWithPass,
    updateWithoutPass,
    deleteUser,
} = require('./service')

const exportDb = {
    listUsers,
    findUserById,
    addUser,
    updateWithPass,
    updateWithoutPass,
    deleteUser,
}

module.exports = exportDb
