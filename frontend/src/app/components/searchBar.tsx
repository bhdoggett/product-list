"use client";
import { useState } from "react";
import { setQuery } from "../lib/products/products";
import { useAppDispatch } from "../lib/hooks";

const SearchBar = () => {
  const [queryString, setQueryString] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setQuery(query));
  };

  return (
    <div>
      <form action="submit" onSubmit={handleSubmit}>
        <label htmlFor="search">Search</label>
        <input
          type="text"
          placeholder="Search..."
          value={queryString}
          onChange={(e) => setQueryString(e.target.value)}
        ></input>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SearchBar;
