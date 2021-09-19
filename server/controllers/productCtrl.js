// MongoDB models for products
const Products = require("../models/productModel");
// Filter, sorting and paginating of products
class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    // Get all query elements
    const queryObj = { ...this.queryString };
    // Limit elements from page, sort and limit
    const excludedFields = ["page", "sort", "limit"];
    // Take excluded field elements and eliminate sections
    excludedFields.forEach((el) => delete queryObj[el]);
    // After deleting page
    /*  console.log({ after: queryObj }); */
    // Send query string to elements
    let queryStr = JSON.stringify(queryObj);
    // Use regex to create expression of elements
    /* gte = greater than expression, lte=lower than expression 
      gt = greater than, lt=lower than 
      regex=complete words 
    */
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );
    // Get element from query find
    this.query.find(JSON.parse(queryStr));
    // Return elements
    return this;
  }
  sorting() {
    if (this.queryString.sort) {
      // We need to know the name that we are sorting
      const sortBy = this.queryString.sort.split(",").join(" ");
      // Once we have the name search only that element
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
  paginating() {
    // Get the page limits for this query, # of elements
    const page = this.queryString.page * 1 || 1;
    // Range of elements to be displayed
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * 1;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

// Controls of products
const productCtrl = {
  getProducts: async (req, res) => {
    try {
      // Obtain feature of elements
      const features = new APIfeatures(Products.find(), req.query)
        .filtering()
        .sorting()
        .paginating();
      // Only return list of products available
      const products = await features.query;
      res.json({
        status: "success",
        result: products.length,
        products: products,
      });
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
