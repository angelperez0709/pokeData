export default function PokemonImage({ index }) {
  let endUrl = (index >= 1018 ? '/items/poke-ball' : `/pokemon/${index}`)+'.png'
  const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites${endUrl}`
  
  return (
    <img
      className={url.endsWith("poke-ball.png") ? "h-[96px]" : ""}
      src={url}
    />
  );
}
