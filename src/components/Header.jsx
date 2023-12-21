import pokemonLogo from "../assets/pokemonLogo.png";
function Header() {
  return (
    <header >
      <div className="bg-[#e83f36] p-10 flex flex-col justify-center items-center gap-10">
        <img className="w-60 mx-auto" src={pokemonLogo} />
      </div>
      <div className="bg-[rgb(85,85,87)] h-10"></div>
    </header>
  );
}
export default Header;
