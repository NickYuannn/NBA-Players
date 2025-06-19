import React from "react";
import SearchBar from "../Components/SearchBar.tsx";
import { useState } from "react";
import { FaBasketball } from "react-icons/fa6";

function SearchPage() {
  return (
    <main className="min-h-screen p-8 background-gray">
      <h1 className="text-3xl font-bold mb-6 text-center text-white font-[Oswald] ">
        Basketball Hub Search Engine
        <FaBasketball className="inline-block ml-2 text-orange-500" />
      </h1>

      <div className="flex justify-center">
        <SearchBar />
      </div>
    </main>
  );
}

export default SearchPage;
