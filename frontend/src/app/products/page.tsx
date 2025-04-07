"use client";

import ProductsPage from "../components/productsPage";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import SearchBar from "../components/searchBar";
import { useAppSelector } from "../lib/hooks";
import { useParams } from "next/navigation";

const Products = () => {
  return (
    <div>
      <h1 className="m-3">Products</h1>
      <SearchBar />
      <ProductsPage />
    </div>
  );
};

export default Products;
