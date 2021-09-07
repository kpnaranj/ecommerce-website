// Private Libraries
const router = require("express").Router();
// Public Libraries
const userCtrl = require("../controllers/userCtrl");
// Router actions - GET, POST, DELETE, PUT content
router.post("/register", userCtrl.register); // Register elements
router.post("/login", userCtrl.login); // Login elements
router.get("/refresh_token", userCtrl.refreshToken); // Refresh token elements
// Export module of elements
module.exports = router;
