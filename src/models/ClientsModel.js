module.exports = async function(Sequelize, sequelize){
    return sequelize.define("clients",{
        id:{
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4(),
            primaryKey: true
        },

        name:{
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },

        surname:{
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },

        birth_date: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
        },

        age: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },

        created_date:{
            type: Sequelize.DataTypes.DATE,
            defaultValue: new Date(),
        },

        modified_date:{
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
        },

    })
}