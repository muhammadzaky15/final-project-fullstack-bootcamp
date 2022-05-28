const db = require("../services/db");

const tableName = "users";

async function create(data) {
    const query = `insert into ${tableName} (name, email, password, status, address) 
    values ("${data.name}", "${data.email}", "${data.password}", ${data.status}, "${data.address}")`;

    const insertUser = await db(query);
    return insertUser;
}

async function get() {
    const query = `select id as user_id, name, email, address, status from ${tableName}`;
    const users = await db(query);

    return users;
}

async function getUserByEmail(data) {
    const query = `select * from ${tableName} where email = "${data.email}"`;
    const users = await db(query);

    return users;
}

module.exports = {
    create,
    get,
    getUserByEmail
}