var express = require('express');
var router = express.Router();
const { validationResult } = require('express-validator');


const productController = require("../controllers/product");
const middlewareVerifyToken = require("../middlewares/verifyToken");
const productValidator = require("../middlewares/product.validator");

// Get list Products
router.get('/', async function(req, res, next) {
  //memanggil controller untuk product
    const products = await productController.get();
    res.send({
        data: products
    })
});

router.post("/", middlewareVerifyToken, productValidator(), async function(req, res, next) {
    const error = validationResult(req);
    console.log(error)
    if(!error.isEmpty()){
        res.status(400).send({
            error: error.errors
        })
        return
    }

    const createProduct = await productController.create(req.body, req.user);

    res.status(createProduct.status).send(createProduct);
})

router.get("/:id", async function(req, res) {
    res.send({
        name: "testing aja"
    })
})

module.exports = router;