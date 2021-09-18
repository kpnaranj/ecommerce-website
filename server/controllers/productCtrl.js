// MongoDB models for products
const Products = require("../models/productModel");
// Controls of products
const productCtrl = {
  getProducts: async (req, res) => {
    try {
      // Only return list of products available
      const products = await Products.find();
      res.json(products);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createProduct: async (req, res) => {
    try {
      // destructure elements
      const {
        product_id,
        title,
        price,
        description,
        content,
        images,
        category,
      } = req.body;
      // Check if image exist
      if (!images) {
        return res.status(400).json({ msg: "No image uploaded" });
      }
      // Obtain required product
      const product = await Products.findOne({ product_id });
      // Check if product already exists
      if (product) {
        return res.status(400).json({
          msg: "This product already exists. Please, try a new product",
        });
      }
      // If not, then create a new product
      const newProduct = new Products({
        product_id,
        title: title.toLowerCase(),
        price,
        description,
        content,
        images,
        category,
      });
      // Finally save new product
      await newProduct.save();
      // Send message response
      res.json({ msg: "Created a product" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      // Obtain products by id
      await Products.findOneAndDelete(req.params.product_id);
      // And send response of deletion
      res.json({ msg: "Deleted a Product" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateProduct: async (req, res) => {
    // Destructure elements
    try {
      const { title, price, description, content, images, category } = req.body;
      // Check if image exist
      if (!images) {
        return res.status(400).json({ msg: "No image upload" });
      }
      // And update a product requirement
      await Products.findOneAndUpdate(
        { _id: req.params.id },
        {
          title: title.toLowerCase(),
          price,
          description,
          content,
          images,
          category,
        }
      );
      // Finally confirm that product was updated
      res.json({ msg: "Updated a Product" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
// Export control models
module.exports = productCtrl;
