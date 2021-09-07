// Private Libraries
const router = require("express").Router();
// Public Libraries
const categoryCtrl = require("../controllers/categoryCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
// Router actions - GET, POST, DELETE, PUT content
router
  .route("/category")
  .get(categoryCtrl.getCategories)
  .post(auth, authAdmin, categoryCtrl.createCategory); // Get and create category elements
router
  .route("/category/:id")
  .delete(auth, authAdmin, categoryCtrl.deleteCategory)
  .put(auth, authAdmin, categoryCtrl.updateCategory); // delete and update category element
// Export module of elements
module.exports = router;
