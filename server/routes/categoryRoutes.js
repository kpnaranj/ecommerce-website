// Private Libraries
const router = require("express").Router();
// Public Libraries
const categoryCtrl = require("../controllers/categoryCtrl");
const auth = require("../middleware/auth");
// Router actions - GET, POST, DELETE, PUT content
router.get("/category", categoryCtrl.getCategories); // Get category elements
// Export module of elements
module.exports = router;
