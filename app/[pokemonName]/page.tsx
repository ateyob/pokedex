import { getPokemon } from "@/lib/pokemonAPI";
import { PokemonImage } from "../components/pokemon-image";
import Link from 'next/link'
import { AiOutlineArrowLeft } from 'react-icons/ai';


export default async function PokemonPage({ params } : { params: { pokemonName: string } }) {
    const { pokemonName } = params;
    const pokemonObject = await getPokemon(pokemonName);

    console.log(pokemonObject);

    return (
        <>
        
            <nav className=' w-full p-4 z-10 flex flex-row items-center gap-8 bg-opacity-70 md:px-32'>
                <Link href='/' className=" flex gap-4 items-center" >

                <AiOutlineArrowLeft
                className=' text-white' size={40} />
                <p className=' text-white text-1xl md:text-3xl font-bold'>
                    <span className=' font-light mr-2'>
                        Back
                    </span>
                </p> 
                </Link>
            </nav>

            <h1 className="text-4xl text-bold pt-4">{pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}</h1>
            <div className="m-4" style={{ position: "relative", width: '300px', height: '300px'}}>
                <PokemonImage 
                    image={pokemonObject.sprites.other['official-artwork'].front_default }
                    name={pokemonName}
                />
            </div>
            <h3 className="text-xl font-semibold my-8">{`Weight: ${pokemonObject.weight}`}</h3>
            <div className="grid md:grid-cols-2 mt-4 gap-8">
                {pokemonObject.stats.map((statObject: any) => {
                const statName = statObject.stat.name;
                const statValue = statObject.base_stat;

                return (
                    <div
                    className="flex items-center max-w-md px-4 py-6 w-80 md:w-96 mb-4 bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 to bg-purple-400 rounded-lg shadow-md transition duration-300 hover:scale-105"
                    key={statName}
                    >
                       <h3 className="text-white text-base md:text-xl xl:text-2xl font-semibold mb-2">
                            {statName}:
                        </h3>
                        <h3 className="ml-auto text-white text-base md:text-xl xl:text-2xl font-semibold">
                            {statValue}
                        </h3>
                    </div>
                );
                })}
            </div>
        </>
    )

}