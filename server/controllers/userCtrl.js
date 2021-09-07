// Import users models with their db elements
const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// Create user controls
const userCtrl = {
  register: async (req, res) => {
    try {
      // Obtain values from body request
      const { name, email, password } = req.body;
      // Obtain user from request
      const user = await Users.findOne({ email });
      // Check if user exist, if true then send to user an error
      if (user) {
        return res.status(400).json({ msg: "The email already exists" });
      }
      // If password is less than 6 letters send user an error
      if (password.length < 6) {
        return res
          .status(400)
          .json({ msg: "Password is at least 6 characters" });
      }
      // If met requirement, encrypt password with salt element
      const passwordHash = await bcrypt.hash(password, 10);
      // Testing -  res.json({ password, passwordHash, msg: "Register succesfully" });
      const newUser = new Users({ name, email, password: passwordHash });
      // Testing - res.json(newUser);
      // Save elements in MongoDB
      await newUser.save();
      // Create jsonwebtoken to authentication
      const accessToken = createAccessToken({ id: newUser._id });
      const refreshToken = createRefreshToken({ id: newUser._id });
      // Send tokens to the cookie set
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/api/refresh_token",
      });
      // Everything is completed, send a success registration
      res.json({ accessToken, msg: "Register Success" });
    } catch (err) {
      // Catch error if there is an error in the server
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      // Destructure request body to obtain email and password
      const { email, password } = req.body;
      // Obtain user elements from given email
      const user = await Users.findOne({ email });
      // If user does not exist, we cannot login, return error
      if (!user) {
        return res
          .status(400)
          .json({ msg: "User does not exist. Please try again" });
      }
      // If user exist, then compare given password with existing
      const isMatch = await bcrypt.compare(password, user.password);
      // If there is no match, then user password is incorrect
      if (!isMatch) {
        return res
          .status(400)
          .json({ msg: "Incorrect password. Please try again" });
      }
      // If match is true, then we create an acces and refresh token
      // Create jsonwebtoken to authentication
      const accessToken = createAccessToken({ id: user._id });
      const refreshToken = createRefreshToken({ id: user._id });
      // Send tokens to the cookie set
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/api/refresh_token",
      });
      // Everything is completed, send a success registration
      res.json({ accessToken, msg: "Login Successful!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  refreshToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshToken;
      // Check that the token exist, if not return an error
      if (!rf_token) {
        return res.status(400).json({ msg: "Please Login or Register" });
      }
      // If exist verify jwt with token and refresh access
      jwt.verify(rf_token, process.env.REFRESH_ACCESS_TOKEN, (err, user) => {
        // If error display that user should login again
        if (err) {
          return res.status(400).json({ msg: "Please Login or Register" });
        }
        // If no error exist then store access token and send user token
        const accessToken = createAccessToken({ id: user.id });
        res.json({ accessToken });
      });
    } catch (err) {
      // Catch error if there is an error in the server
      return res.status(500).json({ msg: err.message });
    }
  },
};

// Function create access token
const createAccessToken = (userId) => {
  return jwt.sign(userId, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};
const createRefreshToken = (userId) => {
  return jwt.sign(userId, process.env.REFRESH_ACCESS_TOKEN, {
    expiresIn: "7d",
  });
};
// Export user control of elements
module.exports = userCtrl;
