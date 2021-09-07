// MongoDB models for category
const Category = require("../models/categoryModel");
// Controls of categories
const categoryCtrl = {
  getCategories: async (req, res) => {
    try {
      // Obtain data from category
      const categories = await Category.find();
      // Send response of category
      res.json(categories);
    } catch (err) {
      // Cacth errors from the response
      return res.status(500).json({ msg: err.message });
    }
  },
  createCategory: async (req, res) => {
    try {
      // if user have role = 1 ---> admin
      // only admin can create , delete and update category
      const { name } = req.body;
      // From name of category find element
      const category = await Category.findOne({ name });
      // If category exists then send error as it is created
      if (category) {
        return res.status(400).json({ msg: "This category already exists." });
      }
      // Create a new category of elements
      const newCategory = new Category({ name });
      // Wait for the category to be saved
      await newCategory.save();
      // And send a response message for category
      res.json({ msg: "Created a category" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      // Get data from category, find the element to delete
      await Category.findByIdAndDelete(req.params.id);
      // Send message confirmation of deleted element
      res.json({ msg: "Deleleted a Category successful" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateCategory: async (req, res) => {
    try {
      //  Get the new name of element in request body
      const { name } = req.body;
      // And update category with the given id
      await Category.findOneAndUpdate({ _id: req.params.id }, { name });
      // Send response to elements
      res.json({ msg: "Updated a category" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
// Export control cateogories with elements
module.exports = categoryCtrl;
