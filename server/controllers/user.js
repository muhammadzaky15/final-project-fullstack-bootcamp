const bcrypt = require("bcrypt");
const userModels = require("../models/users");
const userStatus = require("../enums/userStatus");
const storeModels = require("../models/stores");
const res = require("express/lib/response");

async function create(data){
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(data.password, salt);
    data.password = hash;

    const insertUser = await userModels.create(data);
    console.log(insertUser)
    const response = {
        user_id: insertUser.insertId,
        name: data.name,
        email: data.email,
        address: data.address,
        status: userStatus[data.status]
    }
    // 1. apakah di seller?
    // 2. kalau dia seller, kita akan insert ke table store
    if(data.status === 1){
        // 3. kirim data store ke model store
        const dataStore = {
            name: data.name,
            address: data.address,
            userId: insertUser.insertId
        }
        const insertUserToStore = await storeModels.create(dataStore);
        response.store = {
            store_id: insertUserToStore.insertId,
            name: data.name,
            address: data.address
        }
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