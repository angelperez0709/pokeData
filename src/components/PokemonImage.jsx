
export default function PokemonImage({index}){
    return (
    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`}/>
    )
}