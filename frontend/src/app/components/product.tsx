"use client";
import React from "react";

type ProductPropsType = {
  category: string;
  price: number;
  image: string;
  name: string;
};

const Product: React.FC<ProductPropsType> = ({
  category,
  price,
  image,
  name,
}) => {
  return (
    <div>
      <h3>{category}</h3>
      <h3>{price}</h3>
      <h3>{image}</h3>
      <h3>{name}</h3>
    </div>
  );
};

export default Product;
