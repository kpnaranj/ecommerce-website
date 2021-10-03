// Public imports
import React from "react";
// Private imports
import BtnRender from "./BtnRender";
// Function Product items - Create a single box of products
export default function ProductItem({ product }) {
  // Return elements from section - Product card of element
  return (
    <div className="product_card">
      {/* Product image */}
      <img src={product.images.url} alt={product.title} />
      {/* After image we bring product box with content */}
      <div className="product_box">
        {/* Product title */}
        <h2 title={product.title}>{product.title}</h2>
        {/* Product Price */}
        <span>${product.price}</span>
        {/* Product Description */}
        <p>{product.description}</p>
      </div>
      {/* Set of buttons with different actions */}
      <BtnRender product={product} />
    </div>
  );
}
