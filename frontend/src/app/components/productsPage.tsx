"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { useSearchParams } from "next/navigation";
import {
  fetchProducts,
  setSearch,
  setCategory,
  setSortPrice,
  setPage,
  updateQueryString,
} from "../lib/products/products";
import Product from "./product";

const ProductsPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const category = searchParams.get("category");
  const price = searchParams.get("price");
  const page = Number(searchParams.get("page"));
  const queryStringFromUrl = searchParams.toString();
  const queryStringFromStore = useAppSelector(
    (state) => state.products.query.string
  );
  const { products, loading, error } = useAppSelector(
    (state) => state.products
  );

  //test querystring
  useEffect(() => {
    console.log(queryStringFromStore);
  }, [queryStringFromStore]);

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
      dispatch(setPage(page));
    }
    dispatch(updateQueryString());
  }, [search, category, price, page, dispatch]);

  useEffect(() => {
    dispatch(fetchProducts(queryStringFromUrl));
  }, [dispatch, queryStringFromUrl]);

  useEffect(() => {
    router.push(`/products?${queryStringFromStore}`);
  }, [router, queryStringFromStore]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen mt-5">
      <h1 className="text-2xl">Products page</h1>
      <div className="grid grid-cols-3 gap-1 w-60%">
        {products?.currentPage.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
