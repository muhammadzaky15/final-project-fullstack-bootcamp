const productModel = require("../models/products");
const storeModels = require("../models/stores");

async function get(){
    const products = await productModel.get();
    return products;
}


async function create(data, user){
    const isSeller = user.status;

    if(isSeller !== "seller") {
        return {
            status: 401,
            message: "hanya seller yang bisa add products"
        }
    }

    const storeId = await storeModels.getStoreIdByUserId(user.id);

    const productData = {
        name: data.name,
        price: data.price,
        description: data.description,
        category_id: data.category_id,
        status: data.status,
        stock: data.stock,
        images: data.images,
        store_id: storeId
    }

    const insertProduct = await productModel.create(productData);
    const response = {
        ...productData,
        id: insertProduct.insertId
    }

    return {
        status: 200,
        data: response
    }
}

module.exports = {
    get,
    create
}