import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import getFavourites from "../actions/getFavorites";
import { type } from "os";
import Image from "next/image";
import { getPokemon } from "@/lib/pokemonAPI";
import { Fragment } from "react";

const Page = async () => {
  const fav = await getFavourites();

  if (Array.isArray(fav)) {
    const jsxElements = fav.map(async (elem: any, index: number) => {
      const pokemondata = await getPokemon(elem.name);
      const frontDefaultImage = pokemondata.sprites.front_default;

      return (
        <Fragment key={index}>
          <div className="md:flex justify-center items-center md:my-12">
            <div className="flex flex-row md:flex-col items-center border p-4 my-4 hover:scale-105">
            {frontDefaultImage && (
                <div>
                <Image
                    src={frontDefaultImage}
                    alt={elem.name}
                    width={150}
                    height={150}
                    />
                </div>  
            )}
            <p>{elem.name}</p>
            </div>
          </div>
        </Fragment>
      );
    });

    return <div className=" w-full ">
        <div className="">
        <nav className=" w-full p-4 z-10 flex flex-row items-center gap-8 bg-opacity-70 md:px-32">
                <Link href="/" className=" flex gap-4 items-center">
                    <AiOutlineArrowLeft className=" text-white" size={40} />
                    <p className=" text-white text-1xl md:text-3xl font-bold">
                    <span className=" font-light mr-2">Back</span>
                    </p>
                </Link>
            </nav>

            <div>
                <h3 className="text-2xl md:text-4xl py-2 text-center">My Favorites</h3>
            </div>
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 m-4 justify-between">
        {jsxElements}
        </div>
        </div>; // Wrap elements in a flex container
  } else {
    console.log("fav is null or not an array.");
    return <p>Favorites not available</p>;
  }
};

export default Page;
