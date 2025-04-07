"use client";

import ProductsPage from "../components/productsPage";
// import { useDispatch } from "react-redux";
// import { useState, useEffect } from "react";
import SearchBar from "../components/searchBar";
// import { useAppSelector } from "../lib/hooks";
// import { useParams } from "next/navigation";
import { Categories } from "../components/categories";
import { PriceSort } from "../components/priceSort";

const Products = () => {
  return (
    <div className="m-4">
      <div className="flex space-x-3.5 justify-center">
        <SearchBar />
        <Categories />
        <PriceSort />
      </div>

      <ProductsPage />
    </div>
  );
};

export default Products;
