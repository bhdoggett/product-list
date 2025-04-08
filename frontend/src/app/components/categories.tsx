"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import {
  fetchCategories,
  setCategory,
  setPage,
  updateQueryString,
} from "../lib/products/products";

export const Categories = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.products.categories);
  const [selectedCategory, setSelectedcategory] =
    useState<string>("All Categories");

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setSelectedcategory(category);
    if (category === "All Categories") {
      dispatch(setCategory(null));
    } else {
      dispatch(setCategory(category));
      dispatch(setPage(1));
    }
    dispatch(updateQueryString());
  };

  return (
    <div className="border rounded-sm border-black bg-gray-400 p-1">
      <select
        name="categories"
        id="categories"
        onChange={handleCategoryChange}
        defaultValue=""
      >
        <option value="" disabled>
          Sort by category
        </option>
        {categories &&
          categories.length > 0 &&
          categories.map((category) => {
            return (
              <option key={category} value={category}>
                {category}
              </option>
            );
          })}
      </select>
    </div>
  );
};
