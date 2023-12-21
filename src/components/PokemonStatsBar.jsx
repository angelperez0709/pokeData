export default function PokemonStatsBar({ stat, nombre,color }) {
    const width = Math.round(100*stat/255);
  return (
    <>
      <div className="flex justify-between mb-1">
        <span className={"text-base font-medium dark:text-white"}>
          {nombre}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className={"bg-"+color+"-600 h-2.5 rounded-full"}
          style={{width:`${width}%`}}
        ></div>
      </div>
    </>
  );
}
