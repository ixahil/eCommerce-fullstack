"use client";

import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import React, { useState } from "react";

const Searchbar = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    // Handle the search functionality (e.g., redirect, fetch results)
    console.log(`Searching for: ${query}`);
    // You could redirect or call a search function here
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex justify-center items-center w-full"
    >
      <input
        type="text"
        placeholder="Search for products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="rounded-l-md py-2 px-4 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Button className="bg-[#FEBD69] h-full rounded-none border-none rounded-r-md">
        <Search />
      </Button>
    </form>
  );
};

export default Searchbar;
