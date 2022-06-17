const postgres = require("./src/modules/postgres");
let psql = postgres();
const { Op } = require("sequelize");

module.exports.add_client = async function(name, surname, birth_date, age){
    try{
        psql = await psql;

        let client = await psql.clients.create({
            name,
            surname,
            birth_date,
            age,
        },{ 
            raw: true
        })

        return({
            id: client.id,
            msg: "client added",
            client
        })

    }catch(e){
        console.log(e + "")
    }
} 

module.exports.edit_client = async function(id, name, surname, birth_date, age){
    try{
        psql = await psql;
        
        let client = await psql.clients.findOne({
            where:{
                id,
            }
        })

        if(!client) throw new Error("this client not found");

        client = await psql.clients.update({
            name,
            surname,
            birth_date,
            age,
            modified_date: new Date()
        },{
            where:{
                id
            }
        })

        client = await psql.clients.findOne({
            where:{
                id,
            }
        })

        return({
            msg: "edited",
            client
        })

    }catch(e){
        console.log(e + "");
    }
}

module.exports.delete_client = async function(id){
    try{
        psql = await psql;
        
        let client = await psql.clients.findOne({
            where:{
                id,
            }
        })

        if(!client) throw new Error("this client not found");

        await psql.clients.destroy({
            where: {
                id
            }
        })

        return({
            msg: "deleted"
        })
    }catch(e){
        console.log(e + "")
    }
}

module.exports.get_element_by_id = async function(id){
    try{
        psql = await psql;
        
        let client = await psql.clients.findOne({
            where:{
                id,
            }
        })

        if(!client) throw new Error("this client not found");

        return({
            msg: "found",
            name: client.name,
            surname: client.surname,
            birth_date: client.birth_date,
            age: client.age,
        })
    }catch(e){
        console.log(e + "")
    }
}

// module.exports.get_elements_by_id = async function(id, name, surname, from_date, to_date){
//     try{
//         psql = await psql;
//         let clients = await psql.clients.findAll({
//             where: {
//               id: id ? { [Op.eq]: id } : {},
//               name: name ? { [Op.iLike]: `%${name}%` } : {},
//               surname: surname ? { [Op.iLike]: `%${surname}%` } : {},
//               from_date: from_date ? { [Op.gte]: from_date } : {},
//               to_date: to_date ? { [Op.lte]: to_date } : {}
//             }
//           })
          
//           return ({
//             clients
//           })
//     }catch(e){
//         console.log(e )
//     }
// }