import { useState, useEffect, useContext } from "react";
import "./App.css";
import Header from "./components/Header";
import PokemonList from "./components/PokemonList";
import PokemonDataCard from "./components/PokemonDataCard";
import { FiltersContext } from "./components/filters";

const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0";
function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const {pokemonData} = useContext(FiltersContext)
  useEffect(() => {
    fetch(apiUrl)
      .then((data) => data.json())
      .then((result) => setPokemonList(result.results));
  }, []);
  if (pokemonList.length > 0) {
    return (
      <>
              {
          pokemonData.id > 0 && pokemonData.pokemon != "" && <PokemonDataCard pokemonData={pokemonData}></PokemonDataCard>
        }
        <Header></Header>
        <PokemonList pokemonData={pokemonList}></PokemonList>
      </>
    );
  }
}
export default App;
