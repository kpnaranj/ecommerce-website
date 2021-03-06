// .env settup of software
require("dotenv").config();
// Public libraries
const express = require("express");
const cors = require("cors");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
// Private libraries
require("./config/db");
// Setup App
const app = express();
// Global variables
const PORT = process.env.PORT || 5000;
// Global Routes
const userRoutes = require("./routes/userRouter");
const categoryRoutes = require("./routes/categoryRouter");
const uploadRoutes = require("./routes/upload");
const productRoutes = require("./routes/productRouter");
// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(fileupload({ useTempFiles: true }));
// Routes
/* app.get("/", (req, res) => {
  res.json({ msg: "Welcome to Knarsh dev" });
}); */
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", uploadRoutes);
app.use("/api", productRoutes);
// Listening server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
