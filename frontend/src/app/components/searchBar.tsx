"use client";
import { useState } from "react";
import {
  setSearch,
  setPage,
  updateQueryString,
} from "../lib/products/products";
import { useAppDispatch } from "../lib/hooks";

const SearchBar = () => {
  const [searchString, setSearchString] = useState<string>("");
  const dispatch = useAppDispatch();

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
          className="focus:outline-none focus:ring-0 w-80"
        ></input>
      </form>
    </div>
  );
};

export default SearchBar;
