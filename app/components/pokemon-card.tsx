import { useState, useEffect } from "react";
import Link from "next/link";
import { getPokemon } from "@/lib/pokemonAPI";
import Image from "next/image";
import HeartButton from "./HeartButton";


interface PokemonCardProps {
  name: string;
}

export function PokemonCard({ name }: PokemonCardProps) {
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const pokemonData = await getPokemon(name);
        const frontDefaultImage = pokemonData.sprites.front_default;
        setImageUrl(frontDefaultImage);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    };

    fetchPokemonData();
  }, [name]);

  return (
    <Link
      href={name}
      className="
        group rounded-lg border border-transparent 
        m-3 px-5 py-4 transition-colors
        dark:border-gray-500
        hover:border-gray-300 hover:bg-gray-100 
        hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30
      "
      key={name + "Card"}
    >
      <div className=" flex justify-between gap-8">
        <div>
          <h2 className="text-lg md:text-2xl xl:text-4xl font-semibold">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </h2>
        </div>
        <div className=" flex ">
          <HeartButton />
        </div>
      </div>
      <div className=" flex justify-center">
        {imageUrl && <Image src={imageUrl} alt={name} className="mt-2" width={150} height={150} />}
      </div>
    </Link>
  );
}
