const postgres = require("./src/modules/postgres");
let psql = postgres();

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