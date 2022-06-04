const db = require("../services/db");
const tableName = "stores";

async function create(data){
    const query = `insert into ${tableName} (user_id, name, address) values (${data.userId}, "${data.name}", "${data.address}")`
    const result = await db(query);
    return result;
}

async function getStoreIdByUserId(userId) {
    const query = `select id from ${tableName} where user_id = ${userId}`;
    const result = await db(query);
    return result[0].id;
}

module.exports = {
    create,
    getStoreIdByUserId
};