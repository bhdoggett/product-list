"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { setSortPrice, updateQueryString } from "../lib/products/products";

export const PriceSort = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const options = ["high", "low"];
  const [sortOption, setSortOption] = useState<string>("");
  const queryString = useAppSelector((state) => state.products.query.string);
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortOption = e.target.value;
    setSortOption(e.target.value);
    dispatch(setSortPrice(sortOption));
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
        onChange={handleSortChange}
        defaultValue=""
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
