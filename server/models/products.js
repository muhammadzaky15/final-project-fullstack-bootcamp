const db = require("../services/db");

const tableName = "products";

async function get(){
     const query = `select * from ${tableName}`;
     const result = await db(query);
     return result;
}

async function create(data) {
    const query = `insert into ${tableName} 
        (name, price, description, category_id, status, stock, images, store_id) 
        values ("${data.name}", ${data.price}, "${data.description}", ${data.category_id}, ${data.status}, ${data.stock}, "${data.images}", ${data.store_id})`;
    
    const result = await db(query);
    return result;
}

module.exports = {
    get,
    create
}