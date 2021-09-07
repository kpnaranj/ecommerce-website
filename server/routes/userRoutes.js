// Private Libraries
const router = require("express").Router();
// Public Libraries
const userCtrl = require("../controllers/userCtrl");
const auth = require("../middleware/auth");
// Router actions - GET, POST, DELETE, PUT content
router.post("/register", userCtrl.register); // Register user elements
router.post("/login", userCtrl.login); // Login elements
router.get("/logout", userCtrl.logout); // Logout elements
router.get("/refresh_token", userCtrl.refreshToken); // Refresh token elements
router.get("/infor", auth, userCtrl.getUser);
// Export module of elements
module.exports = router;
