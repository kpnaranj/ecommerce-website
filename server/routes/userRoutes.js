// Private Libraries
const router = require("express").Router();
// Public Libraries
const userCtrl = require("../controllers/userCtrl");
// Router actions - GET, POST, DELETE, PUT content
router.post("/register", userCtrl.register);
router.get("/refresh_token", userCtrl.refreshToken);
// Export module of elements
module.exports = router;
