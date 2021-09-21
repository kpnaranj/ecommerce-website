// Import local variables
import React, { useState, useEffect } from "react";
import axios from "axios";
// Component from products API
export default function ProductsAPI() {
  // Obtain elements from products
  const [products, setProducts] = useState([]);
  // Function getProducts - obtains products from backend
  const getProducts = async () => {
    // Get the axios elements - Asyncronous calls
    const res = await axios.get("/api/products");
    console.log(res.data.products);
  };
  // After render call to getProducts
  useEffect(() => {
    getProducts();
  }, []);
  // Return state of elements from api
  return { products: [products, setProducts] };
}
// This element will be imported to global state
