"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  setSearch,
  setPage,
  updateQueryString,
} from "../lib/products/products";
import { useAppDispatch, useAppSelector } from "../lib/hooks";

const SearchBar = () => {
  const [searchString, setSearchString] = useState<string>("");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const queryString = useAppSelector((state) => state.products.query.string);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchString === "") {
      dispatch(setSearch(null));
    } else {
      dispatch(setSearch(searchString));
      dispatch(setPage(1));
      setSearchString("");
    }
    dispatch(updateQueryString());
  };

  return (
    <div className="border rounded-sm border-black bg-gray-100 p-1">
      <form action="submit" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search..."
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        ></input>
      </form>
    </div>
  );
};

export default SearchBar;
