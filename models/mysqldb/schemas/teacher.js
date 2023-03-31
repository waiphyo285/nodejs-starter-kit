module.exports = (instance, Sequelize) => {
    return instance.define('teacher', {
        name: {
            type: Sequelize.STRING,
        },
        age: {
            type: Sequelize.INTEGER,
        },
        degree: {
            type: Sequelize.STRING,
        },
        status: {
            type: Sequelize.BOOLEAN,
        },
    })
}
