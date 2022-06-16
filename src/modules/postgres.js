const db_url = 'postgres://jsdvrzqv:S4RMy1XSOStL_vZcv__cdCgM3H_2rzx8@jelani.db.elephantsql.com/jsdvrzqv';
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(db_url);
const ClientsModel = require("../models/ClientsModel");

module.exports = async function(){
    try{
        const db = {};
        
        db.clients = await ClientsModel(Sequelize, sequelize);

        sequelize.sync({alter: false})

        return db;
    }catch(e){
        console.log(e);
    }
}