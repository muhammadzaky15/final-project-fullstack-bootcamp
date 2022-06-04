const { body } = require("express-validator");

const validate = () => {
  return [
    body("name", "Invalid Name").exists().isString(),
    body("price", "Invalid Price").notEmpty().isNumeric(),
    body("description", "invalid description").optional().isString(),
    body("category_id", "invalid category").exists().isInt(),
    body("status", "invalid status").exists().isInt(),
    body("stock", "invalid stock").exists().isInt(),
    body("images", "invalid iamges").optional().isString()
  ];
};

module.exports = validate;
