// DB Public libraries
const mongoose = require("mongoose");
// DB Global variables
const URI = process.env.MONGODB_URL;
// Start mongoose server
mongoose.connect(URI, async (err) => {
  if (err) throw err;
  console.log(`Connected to db at ${URI}`);
});
