import { createContext, useState } from "react";

export const FiltersContext = createContext();

export function FiltersProvider({ children }) {
  const [pokemonData, setPokemonData] = useState({
    pokemon: "",
    id: 0,
    stats: [],
    types: [],
  });
  return (
    <FiltersContext.Provider
      value={{
        pokemonData,
        setPokemonData,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}
