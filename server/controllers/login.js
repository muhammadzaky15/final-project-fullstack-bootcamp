const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const userModels = require("../models/users");

async function login(data){

    const isUserExist = await userModels.getUserByEmail(data);
    if(isUserExist.length > 0){
        // compare hash by dcrypt
        const isPasswordTrue = bcrypt.compareSync(data.password, isUserExist[0].password); 
        if(isPasswordTrue){
            // generate token
            const token = jwt.sign({ name: "zaky ganteng", alamat: "aceh" }, 'rahasia');
            return {
                status: 200,
                token
            }
        }

        return {
            status: 400,
            message: "password is wrong"
        }
    }

    // return user not found
    return {
        status: 400,
        message: "user not found"
    }
}

module.exports = {
    login
}