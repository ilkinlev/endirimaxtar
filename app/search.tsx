"use client";
import React, { ChangeEvent, useState } from "react";

export type SearchProps = {
  onSearch: (value: string) => void;
};

const Search = (props: SearchProps) => {
  const { onSearch } = props;
  const [value, setValue] = useState("Axtar...");

  const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setValue(target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // Here, we call the onSearch function and pass the value
      onSearch(value);
    }
  };

  return (
    <div className="flex  items-center bg-gray-800 rounded-full px-3 py-2 w-full max-w-xs text-white">
      <input
        type="search"
        name="search"
        placeholder={value}
        className="bg-gray-800 text-sm focus:outline-none w-full"
        onChange={searchHandler}
        onKeyDown={handleKeyDown}
      />
      <svg
        className="h-4 w-4 text-gray-400 ml-2 cursor-pointer"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M13.53 14.47a8 8 0 111.414-1.414l3.96 3.96a1 1 0 01-1.414 1.414l-3.96-3.96zM8 14a6 6 0 100-12 6 6 0 000 12z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};

export default Search;
