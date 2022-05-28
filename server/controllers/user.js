const bcrypt = require("bcrypt");
const userModels = require("../models/users");
const userStatus = require("../enums/userStatus");

async function create(data){
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(data.password, salt);
    data.password = hash;

    const insertUser = await userModels.create(data);
    const response = {
        user_id: insertUser.insertId,
        name: data.name,
        email: data.email,
        address: data.address,
        status: userStatus[data.status]
    }
    return response;
}

async function get(){
    const getUser = await userModels.get();
    const response = {
        data: getUser.map(item => {
            const userStatusMapped = userStatus[item.status]
            return {
                ...item,
                status: userStatusMapped
            }
        })
    }

    return response;
}

module.exports = {
    create,
    get
}