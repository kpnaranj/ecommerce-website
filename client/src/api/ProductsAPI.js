// Import local variables
import { useState, useEffect } from "react";
import axios from "axios";
// Component from products API
export default function ProductsAPI() {
  // Obtain elements from products
  const [products, setProducts] = useState([]);
  // Function getProducts - obtains products from backend
  const getProducts = async () => {
    // Get the axios elements - Asyncronous calls
    const res = await axios.get("/api/products");
    // Finally obtain api products from data elements
    setProducts(res.data.products);
  };
  // After render call to getProducts
  useEffect(() => {
    getProducts();
  }, []);
  // Return data of elements to be used
  return { products: [products, setProducts] };
}
// This element will be imported to global state
