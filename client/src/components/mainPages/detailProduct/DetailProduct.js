// Public Libraries
import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
// Private Libraries
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utils/productItem/ProductItem";

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
    console.log("re render");
    // If params id exist then
    if (params.id) {
      // Find for element in products
      products.forEach((product) => {
        if (product._id === params.id) {
          setDetailProduct(product);
        }
      });
    }
  }, [params.id, products]);
  // If detail product does not exist simply return null
  if (detailProduct.length === 0) {
    return null;
  }

  return (
    <React.Fragment>
      <div className="detail">
        <img src={detailProduct.images.url} alt="" />
        <div className="box-detail">
          <div className="row">
            <h2>{detailProduct.title}</h2>
            <h6>#id: {detailProduct.product_id}</h6>
          </div>
          <span>$ {detailProduct.price}</span>
          <p>{detailProduct.description}</p>
          <p>{detailProduct.content}</p>
          <p>Sold: {detailProduct.sold}</p>
          <Link to="/cart" className="cart">
            Buy Now
          </Link>
        </div>
      </div>
      <div>
        <h2>Related products</h2>
        <div className="products">
          {products.map((product) => {
            return product.category === detailProduct.category ? (
              <ProductItem key={product._id} product={product} />
            ) : null;
          })}
        </div>
      </div>
    </React.Fragment>
  );
}
