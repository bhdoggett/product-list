"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppDispatch, useAppSelector, useAppStore } from "../lib/hooks";
import { useSearchParams } from "next/navigation";
import {
  fetchProducts,
  setSearch,
  setCategory,
  setSortPrice,
  updateQueryString,
} from "../lib/products/products";
import Product from "./product";

const ProductsPage = () => {
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();
  const search = searchParams.get("search");
  const category = searchParams.get("category");
  const price = searchParams.get("price");
  const page = searchParams.get("page");
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (search) {
      dispatch(setSearch(search));
    }
    if (category) {
      dispatch(setCategory(category));
    }
    if (price) {
      dispatch(setSortPrice(price));
    }
    if (page) {
      dispatch(setSortPrice(page));
    }
    dispatch(updateQueryString());
  }, [search, category, price, page, dispatch]);

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
      ))}
    </div>
  );
};

export default ProductsPage;
