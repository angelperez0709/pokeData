const apiUrl = "https://pokeapi.co/api/v2/pokemon";
/*ID OR NAME*/
export default function getPokemons({ offset }) {
  console.log(offset)
  const url = `${apiUrl}?limit=100&offset=${offset}`;

  return fetch(url)
    .then((data) => data.json())
    .then((result) => {
      return result;
    });
}
