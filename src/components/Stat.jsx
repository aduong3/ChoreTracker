const colorClasses = {
  red: "bg-red-300",
  green: "bg-green-300",
  purple: "bg-purple-300",
  blue: "bg-blue-300",
};

function Stat({ icon, title, color, value }) {
  return (
    <div className="grid grid-cols-[3rem_1fr] gap-x-3 rounded-sm bg-stone-50 px-4 py-4 font-bold">
      <div
        className={`row-span-2 flex h-12 w-12 items-center justify-center rounded-full text-[2rem] ${colorClasses[color]}`}
      >
        {icon}
      </div>
      <p className="text-sm text-zinc-600 uppercase">{title}</p>
      <p className="text-xl">{value}</p>
    </div>
  );
}

export default Stat;
