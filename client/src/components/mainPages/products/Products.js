// Public Libraries
import React, { useContext } from "react";
// Private Libraries
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utils/productItem/ProductItem";

export default function Products() {
  // First, obtain state from context
  const state = useContext(GlobalState);
  // Get product elements from state
  const [products] = state.productsAPI.products;
  // Destructure elements
  console.log(products);
  return (
    <div className="products">
      {products.map((product) => {
        return <ProductItem key={product._id} product={product} />;
      })}
    </div>
  );
}
