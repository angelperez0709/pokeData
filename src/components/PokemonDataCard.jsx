import gsap from "gsap";
import { useContext, useEffect, useRef } from "react";
import PokemonImage from "./PokemonImage";
import { FiltersContext } from "./filters";
import PokemonStatsBar from "./PokemonStatsBar";
import getPokemonData from "../services/getPokemonData";

const COLORES = {
  hp: "green",
  attack: "red",
  defense: "blue",
  "special-attack": "yellow",
  "special-defense": "orange",
  speed: "amber",
};
const TIPOS = {
  grass: "planta",
  steel: "acero",
  bug: "bicho",
  dragon: "dragón",
  electric: "eléctrico",
  ghost: "fantasma",
  fire: "fuego",
  fairy: "hada",
  ice: "hielo",
  fighting: "lucha",
  normal: "normal",
  water: "agua",
  psychic: "psícquico",
  rock: "roca",
  dark: "siniestro",
  ground: "tierra",
  poison: "veneno",
  flying: "volador",
};
export default function PokemonDataCard() {
  const { pokemonData, setPokemonData } = useContext(FiltersContext);
  const elemento = useRef();
  let tweenRef = useRef();
  useEffect(() => {
    tweenRef.current = gsap.to(elemento.current, { duration: 1.1, opacity: 1 });
  }, []);
  const handleClick = () => {
    tweenRef.current.reverse();
    tweenRef.current.eventCallback("onReverseComplete", () => {
      setPokemonData({
        ...pokemonData,
        pokemon: "",
        id: 0,
        stats: [],
        types: [],
      });
    });
  };
  const pokemonAfter = () => {
    let index = pokemonData.id + 1;
    getPokemonData(index).then((results) => {
      results.types.forEach((type) => {
        type.type.name = TIPOS[type.type.name];
      });
      setPokemonData({
        ...pokemonData,
        pokemon: results.name,
        id: results.id,
        stats: results.stats,
        types: results.types,
      });
    });
  };

  const pokemonBefore = () => {
    let index = pokemonData.id - 1;
    getPokemonData(index).then((results) => {
      results.types.forEach((type) => {
        type.type.name = TIPOS[type.type.name];
      });
      setPokemonData({
        ...pokemonData,
        pokemon: results.name,
        id: results.id,
        stats: results.stats,
        types: results.types,
      });
    });
  };
  return (
    <div
      ref={elemento}
      className="opacity-0 fixed grid place-content-center w-full h-full z-20 top-0 overflow-hidden backdrop-blur-lg"
    >
      <div className="flex flex-col gap-5 justify-center bg-gradient-to-r from-[#f47b75] to-[#d7342b] rounded-lg p-5 text-white font-bold">
        <div className="flex justify-between flex-row">
          <div>#{pokemonData.id}</div>
          <button className=" h-fit" onClick={handleClick}>
            x
          </button>
        </div>
        <div className="flex flex-row gap-5">
          <div>
            <div className="mb-10">
              <h3 className="text-lg">Elementos</h3>
              {pokemonData.types.map((type) => (
                <div
                  key={pokemonData.id + type.type.name}
                  className="capitalize"
                >
                  {type.type.name}
                </div>
              ))}
            </div>
            <div>
              <div id="statsData" className="w-[20vw]">
                <h2 className="font-mono font-bold text-xl">Estadísticas</h2>
                <div>
                  {pokemonData.stats.map((stat) => (
                    <PokemonStatsBar
                      key={pokemonData.id + stat.stat.name}
                      stat={stat.base_stat}
                      nombre={stat.stat.name}
                      color={COLORES[stat.stat.name]}
                    ></PokemonStatsBar>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="grid place-content-center">
            <PokemonImage index={pokemonData.id} />
            <div
              className="capitalize text-center text-2xl"
            >
              {pokemonData.pokemon}
            </div>
          </div>
        </div>
        <div className={"flex flex-row "+ (pokemonData.id == 1 ? 'justify-end' : 'justify-between')}>
          <button className={pokemonData.id == 1 ? 'hidden' : ''} onClick={pokemonBefore}>Anterior</button>
          <button onClick={pokemonAfter}>Siguiente</button>
        </div>
      </div>
    </div>
  );
}
