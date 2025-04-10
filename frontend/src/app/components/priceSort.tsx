"use client";
import { useState } from "react";
import { useAppDispatch } from "../lib/hooks";
import { setSortPrice, updateQueryString } from "../lib/products/products";

export const PriceSort = () => {
  const dispatch = useAppDispatch();
  const options = ["high", "low"];
  const [sortOption, setSortOption] = useState<string>("");
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortOption = e.target.value;
    setSortOption(e.target.value);
    dispatch(setSortPrice(sortOption));
    dispatch(updateQueryString());
  };

  return (
    <div className="border rounded-sm border-black bg-gray-300 p-1">
      <select
        name="categories"
        id="categories"
        onChange={handleSortChange}
        defaultValue=""
        className="focus:outline-none focus:ring-0"
      >
        <option value="" disabled>
          Sort by price
        </option>
        {options.map((option) => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};
