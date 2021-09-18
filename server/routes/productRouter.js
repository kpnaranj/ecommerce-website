// Create router
const router = require("express").Router();
const { createProduct } = require("../controllers/productCtrl");
// Controllers of product
const productCtrl = require("../controllers/productCtrl");
// Router actions - GET, POST, DELETE, PUT content
router
  .route("/products")
  .get(productCtrl.getProducts)
  .post(productCtrl.createProduct);
router
  .route("/products/:id")
  .delete(productCtrl.deleteProduct)
  .put(productCtrl.updateProduct);
//Export router
module.exports = router;
