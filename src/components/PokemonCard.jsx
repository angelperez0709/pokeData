import PokemonImage from "./PokemonImage";
import { useContext, useEffect, useRef, useState } from "react";
import getPokemonData from "../services/getPokemonData";
import { FiltersContext } from "./filters";

const TIPOS = {
  "grass": "planta",
  "steel": "acero",
  "bug": "bicho",
  "dragon": "dragón",
  "electric": "eléctrico",
  "ghost": "fantasma",
  "fire": "fuego",
  "fairy": "hada",
  "ice": "hielo",
  "fighting": "lucha",
  "normal": "normal",
  "water": "agua",
  "psychic": "psícquico",
  "rock": "roca",
  "dark": "siniestro",
  "ground": "tierra",
  "poison": "veneno",
  "flying": "volador"

}
export default function PokemonCard({ index, name }) {
  const { pokemonData, setPokemonData } = useContext(FiltersContext)
  const [show,setShow] = useState(false)
  const element = useRef()
  const container = useRef()
  useEffect(()=>{
    const onChange = (entries)=>{
      const el = entries[0]
      if(el.isIntersecting){
        setShow(true)
      }
    }
    const observer = new IntersectionObserver(onChange,{
      rootMargin:'150px'
    })
    observer.observe(container.current)
  },[])
  const handleClick = () => {
    getPokemonData(index).then((results) => {
      results.types.forEach((type)=>{
        type.type.name = TIPOS[type.type.name]
      })
      setPokemonData({
        ...pokemonData,
        pokemon: name,
        id: index,
        stats: results.stats,
        types: results.types
      });
    });
  };
  return (
    <div
      ref={element}
      className="flex justify-center items-center"
      onClick={handleClick}
    >
      <div ref={container} className="cursor-pointer flex flex-col sm:flex-row items-start sm:items-center sm:justify-between bg-gradient-to-r from-[#f47b75] to-[#d7342b] w-full p-5 my-5 rounded-lg gap-1">
        <div className="flex flex-row justify-between sm:justify-center items-center gap-1 w-full">
          <span className="text-white font-bold text-opacity-30 text-6xl sm:text-3xl">
            #{index}
          </span>
          <span className="text-white font-bold text-lg capitalize">
            {name}
          </span>
        </div>
        {show ? <PokemonImage index={index} /> : null}
      </div>
    </div>
  );
}
