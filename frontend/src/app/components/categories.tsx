"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { setCategory, updateQueryString } from "../lib/products/products";

export const Categories = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const categories = [
    "All",
    "Electronics",
    "Books",
    "Toys",
    "Sports",
    "Clothing",
    "Garden",
    "Shoes",
    "Kids",
    "Industrial",
    "Games",
    "Tools",
    "Baby",
    "Jewelry",
  ];
  const [selectedCategory, setSelectedcategory] = useState<string>("All");
  const queryString = useAppSelector((state) => state.products.query.string);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setSelectedcategory(category);
    if (category === "All") {
      dispatch(setCategory(null));
    } else {
      dispatch(setCategory(category));
    }
    dispatch(updateQueryString());
  };

  useEffect(() => {
    router.push(`/products?${queryString}`);
  }, [router, queryString]);

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
        {categories.map((category) => {
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
