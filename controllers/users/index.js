const {
    listUsers,
    findUserById,
    addUser,
    updateWithPass,
    updateWithoutPass,
    deleteUser,
} = require('./mongod/index')

const exportDb = {
    listUsers,
    findUserById,
    addUser,
    updateWithPass,
    updateWithoutPass,
    deleteUser,
}

module.exports = exportDb
