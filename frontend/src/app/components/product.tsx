"use client";
import React from "react";
import Image from "next/image";

// type ProductPropsType = {
//   category: string;
//   price: number;
//   image: string;
//   name: string;
// };

const Product = ({ product }) => {
  return (
    <div
      className="flex flex-col justify-between m-4 p-1 w-50 h-50
     border border-black bg-gray-300"
    >
      <div className="flex justify-between">
        <p className="text-xs">Category: {product.category}</p>
        <p className="text-lg font-bold">{product.price}</p>
      </div>
      <img
        src={product.image}
        alt="Image not Found"
        className="flex justify-center"
      />
      <h1 className="flex justify-center text-xl font-bold">{product.name}</h1>
    </div>
  );
};

export default Product;
