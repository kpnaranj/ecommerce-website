// Private libraries
const jwt = require("jsonwebtoken");
// Authentication element
const auth = (req, res, next) => {
  try {
    // Obtain autorization token of elements
    const token = req.header("Authorization");
    // If token does not exist then invalid authorization
    if (!token) {
      return res.status(500).json({ msg: "Invalid Authentication" });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(500).json({ msg: err.message });
      }
      // Change the request user with the given data
      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = auth;
