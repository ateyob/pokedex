import { PokemonGrid } from "./components/pokemon-grid";
import Image from "next/image";
import { getPokemonList } from "@/lib/pokemonAPI";
import getFavourites from "./actions/getFavorites";
import { useRouter } from "next/navigation";

export default async function Home() {
  const pokemonList = await getPokemonList();
  const favorites = await getFavourites();

  return <PokemonGrid pokemonList={pokemonList} favourites={favorites} />;
}
