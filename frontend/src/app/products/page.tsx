"use client";

import ProductsPage from "../components/productsPage";
// import { useDispatch } from "react-redux";
// import { useState, useEffect } from "react";
import SearchBar from "../components/searchBar";
// import { useAppSelector } from "../lib/hooks";
// import { useParams } from "next/navigation";
import { Categories } from "../components/categories";
import { PriceSort } from "../components/priceSort";
import { useAppDispatch } from "../lib/hooks";
import {
  setSearch,
  setCategory,
  setSortPrice,
  setPage,
  updateQueryString,
} from "../lib/products/products";

const Products = () => {
  const dispatch = useAppDispatch();

  const handleReset = () => {
    dispatch(setSearch(null));
    dispatch(setCategory(null));
    dispatch(setSortPrice(null));
    dispatch(setPage(1));
    dispatch(updateQueryString());
  };

  return (
    <div className="m-4">
      <div className="flex space-x-3.5 justify-center">
        <SearchBar />
        <Categories />
        <PriceSort />
        <button
          className="border rounded-sm border-black bg-gray-500 p-1 text-gray-100"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>

      <ProductsPage />
    </div>
  );
};

export default Products;
