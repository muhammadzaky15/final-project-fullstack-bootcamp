var express = require('express');
var router = express.Router();
const userController = require("../controllers/user");
/* GET users listing. */
router.get('/', async function(req, res, next) {
  const getUser = await userController.get();
  res.send(getUser);
});


router.post("/", async function(req, res) {
  const data = req.body;

  const insertUser = await userController.create(data);
  res.send(insertUser);

})

module.exports = router;
