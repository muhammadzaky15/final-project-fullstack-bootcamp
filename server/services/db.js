const mysql = require("mysql2/promise");
const config = require("../config/db");

async function db(query) {
    const connection = await mysql.createConnection(config);
    const [rows] = await connection.execute(query);
    return rows;
}

module.exports = db;