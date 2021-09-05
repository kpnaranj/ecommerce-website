// Import users models with their db elements
const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
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
      // Everything is completed, send a success registration
      res.json({ msg: "Register Success" });
    } catch (err) {
      // Catch error if there is an error in the server
      return res.status(500).json({ msg: err.message });
    }
  },
};
// Export user control of elements
module.exports = userCtrl;
