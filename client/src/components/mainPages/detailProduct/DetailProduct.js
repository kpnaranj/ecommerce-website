// Public Libraries
import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
// Private Libraries
import { GlobalState } from "../../../GlobalState";

export default function DetailProduct() {
  // Obtain params from id section
  const params = useParams();
  // Obtian state from global variable
  const state = useContext(GlobalState);
  // Obtain products from state
  const [products] = state.productsAPI.products;
  // Obtain detail products with state section
  const [detailProduct, setDetailProduct] = useState([]);
  // Render chosen product to the details page
  useEffect(() => {
    // If params id exist then
    if (params) {
      // Find for element in products
      products.forEach((product) => {
        if (product._id === params.id) {
          setDetailProduct(product);
        }
      });
    }
  }, [params, products]);
  // If detail product does not exist simply return null
  if (detailProduct.length === 0) {
    return null;
  }
  // Check the detail product in the website
  console.log(detailProduct);
  // Make single page with available details
  return (
    <div className="detail">
      {/* Detail section with full image */}
      <img src={detailProduct.images.url} alt={detailProduct.title} />
      {/* Get the detail elements in box */}
      <div className="box-detail">
        <div className="row">
          <h2>{detailProduct.title}</h2>
          <h6>{detailProduct.product_id}</h6>
        </div>
        {/* Details price */}
        <span>${detailProduct.price}</span>
        {/* Description of element */}
        <p>{detailProduct.description}</p>
        <p>{detailProduct.content}</p>
        {/* # of elements sold */}
        <p>Sold: {detailProduct.sold}</p>
        <Link to="/cart" className="cart">
          Buy Now
        </Link>
      </div>
    </div>
  );
}
