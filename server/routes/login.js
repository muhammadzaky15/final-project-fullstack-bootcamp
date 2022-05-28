var express = require('express');
var router = express.Router();

const loginController = require("../controllers/login");

router.post("/", async function(req, res){
    const login = await loginController.login(req.body);
    res.status(login.status).send(login);
})

module.exports = router;