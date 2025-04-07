"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector, useAppStore } from "../lib/hooks";
import { useSearchParams } from "next/navigation";
import { fetchProducts } from "../lib/products/products";
import { Product } from "../lib/products/products";

const ProductsPage = () => {
  const queryString = useSearchParams().toString();
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts(`${queryString}?${queryString}`));
  }, [dispatch, queryString]);

  console.log("products,", products);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="m-4">
      <h1>Products page</h1>
      {products.map((product) => (
        <Product key={product._id} product={product} />
        // <div key={product._id}>
        //   <h6>Category: {product.category}</h6>
        //   <h3>{product.price}</h3>
        //   <p>{product.image}</p>
        //   <h1>{product.name}</h1>
        // </div>
      ))}
    </div>
  );
};

export default ProductsPage;
