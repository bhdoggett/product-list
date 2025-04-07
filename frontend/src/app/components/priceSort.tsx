"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { setSortPrice, updateQueryString } from "../lib/products/products";

export const PriceSort = () => {
  const [sortOption, setSortOption] = useState<string>("");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const queryString = useAppSelector((state) => state.products.query.string);
  const options = ["high", "low"];

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortOption = e.target.value;
    setSortOption(sortOption);
    dispatch(setSortPrice(sortOption));
    dispatch(updateQueryString());
    router.push(`/products?${queryString}`);
  };

  return (
    <div className="border rounded-sm border-black bg-gray-400 p-1">
      <select
        name="categories"
        id="categories"
        onChange={handleSortChange}
        defaultValue=""
      >
        <option value="" disabled>
          Price
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
