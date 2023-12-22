import PokemonCard from "./PokemonCard";
function PokemonList(pokemonData) {
  const dataPokemon = pokemonData.pokemonData;
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-center p-5 place-content-center gap-5">
        {dataPokemon.map((pokemon, index) => (
          <PokemonCard index={++index} key={pokemon.name} name={pokemon.name} />
        ))}
      </div>
    </>
  );
}

export default PokemonList;
