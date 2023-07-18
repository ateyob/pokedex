'use client'

import { PokemonCard } from "./pokemon-card";
import { useState } from "react";
import { Input } from "./input";

interface PokemonGridProps {
  pokemonList: any;
}

export function PokemonGrid({ pokemonList }: PokemonGridProps) {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;


  const searchFilter = (pokemonList: any) => {
    return pokemonList.filter(
      (pokemon: any) =>
        pokemon.name.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const filteredPokemonList = searchFilter(pokemonList);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPokemonList.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div>
        <h3 className="text-2xl py-6 text-center">Search For Your Pokemon!</h3>
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <p>Pokemon Name</p>
            <Input
            type="text"
            value={searchText}
            autoComplete="off"
            id="pokemonName"
            placeholder="Charizard, Pikachu, etc."
            onChange={(e) => {
              setSearchText(e.target.value)
            }}
          />
        </div>
        <h3 className="text-3xl pt-12 pb-6 text-center">Pokemon Collection</h3>
      </div>

      <div className="mb-32 grid text-center lg:mb-0 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:text-left">
        {currentItems.map((pokemon: any) => {
          return (
            <PokemonCard name={pokemon.name} key={pokemon.name + "Card"} />
          );
        })}
      </div>

      <div className="flex justify-center md:mt-16 overflow-x-auto">
  <ul className="flex flex-wrap flex-row gap-4 justify-center">
    {currentPage > 1 && (
      <>
        <li
          className="mr-1 bg-gray-200 rounded-full px-4 py-2 text-black cursor-pointer font-semibold"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          &larr;
        </li>
        <li
          className={`mr-1 ${
            currentPage === 1 ? "bg-purple-500 text-white" : "bg-gray-200 hover:bg-purple-300"
          } rounded-full px-4 py-2 text-black cursor-pointer font-semibold`}
          onClick={() => handlePageChange(1)}
        >
          1
        </li>
      </>
    )}
    {Array(Math.ceil(filteredPokemonList.length / itemsPerPage)).fill(0).map((_, index) => {
      if (
        index === currentPage - 1 ||
        index === currentPage ||
        index === currentPage + 1 ||
        index === Math.ceil(filteredPokemonList.length / itemsPerPage) - 1
      ) {
        if (index === currentPage + 1 && index !== 2) {
          return (
            <li
              key={index}
              className="mr-1 bg-gray-200 rounded-full px-4 py-2 text-black cursor-pointer font-semibold"
            >
              ...
            </li>
          );
        }
        return (
          <li
            key={index}
            className={`mr-1 ${
              currentPage === index + 1
                ? "bg-purple-500 text-white"
                : "bg-gray-200 hover:bg-purple-300"
            } rounded-full px-4 py-2 text-black cursor-pointer font-semibold`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </li>
        );
      }
      return null;
    })}
    {currentPage < Math.ceil(filteredPokemonList.length / itemsPerPage) && (
      <li
        className="mr-1 bg-gray-200 rounded-full px-4 py-2 text-black cursor-pointer font-semibold"
        onClick={() => handlePageChange(currentPage + 1)}
      >
        &rarr;
      </li>
    )}
  </ul>
</div>

    </>
  );
}
