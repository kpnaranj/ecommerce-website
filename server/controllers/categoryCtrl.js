// MongoDB models for category
const Category = require("../models/categoryModel");
// Controls of categories
const categoryCtrl = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
// Export control cateogories with elements
module.exports = categoryCtrl;
