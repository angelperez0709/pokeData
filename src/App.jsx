import { useState, useEffect, useContext, useRef, useCallback } from "react";
import "./App.css";
import Header from "./components/Header";
import PokemonList from "./components/PokemonList";
import Loader from "./components/Loader";
import PokemonDataCard from "./components/PokemonDataCard";
import { FiltersContext } from "./components/filters";
import getPokemons from "./services/getPokemons";

function App() {
  const { pokemonData } = useContext(FiltersContext);
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef();

  const fetchData = useCallback(async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    getPokemons({ offset }).then((results) => {
      setPokemonList((prevPokemons) => [...prevPokemons, ...results.results]);
      setOffset((prevOffset) => prevOffset + 100);
      setIsLoading(false);
    });
  }, [offset, isLoading]);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        fetchData();
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [fetchData]);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      getPokemons({offset}).then((results) => {
        setPokemonList((prevPokemons) => [...prevPokemons, ...results.results]);
        setOffset((prevOffset) => prevOffset + 100);
        setIsLoading(false);
      });
    };
    getData();
  }, []);
  return (
    <>
      {pokemonData.id > 0 && pokemonData.pokemon != "" && (
        <PokemonDataCard pokemonData={pokemonData}></PokemonDataCard>
      )}
      <Header></Header>
      <PokemonList pokemonData={pokemonList}></PokemonList>
      <div className="grid place-content-center" ref={loaderRef}>
        {<Loader />}
      </div>
    </>
  );
}
export default App;
