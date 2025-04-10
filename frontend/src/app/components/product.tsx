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
      className="flex flex-col justify-between m-4 p-1 w-50 h-70
     border border-black bg-white shadow-2xl shadow-gray-700"
    >
      <div className="flex justify-between">
        <p className="text-xs">Category: {product.category}</p>
        <p className="text-lg font-bold">{product.price}</p>
      </div>
      <img
        src={product.image}
        alt="Image not Found"
        className="flex w-45 h-45 object-contain mx-auto border border rounded-sm"
      />
      <h1 className="flex justify-center text-xl font-bold">{product.name}</h1>
    </div>
  );
};

export default Product;
