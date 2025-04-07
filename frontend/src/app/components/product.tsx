"use client";
import React from "react";

// type ProductPropsType = {
//   category: string;
//   price: number;
//   image: string;
//   name: string;
// };

const Product: React.FC = ({ product }) => {
  return (
    <div className="m-4">
      <h6>Category: {product.category}</h6>
      <h3>{product.price}</h3>
      <p>{product.image}</p>
      <h1>{product.name}</h1>
    </div>
  );
};

export default Product;
