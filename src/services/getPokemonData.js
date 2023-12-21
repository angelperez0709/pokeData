const pokeURL = "https://pokeapi.co/api/v2/pokemon/";
/*ID OR NAME*/ 
export default function getPokemonData(pokemon) {
  return fetch(pokeURL + pokemon)
    .then((data) => data.json())
    .then((result) => {
      return result;
    });
}
