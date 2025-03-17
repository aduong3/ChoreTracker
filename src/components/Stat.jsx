const colorClasses = {
    red: 'bg-red-200',
    green: 'bg-green-200',
    purple: 'bg-purple-200',
    blue: 'bg-blue-200',
}


function Stat({icon, title, color, value }) {
    return (
    <div className='bg-stone-50 grid grid-cols-[3rem_1fr] py-4 px-4 rounded-sm gap-x-3 font-bold'>
        <div className={`row-span-2 text-[2rem] rounded-full h-12 w-12 flex items-center justify-center ${colorClasses[color]}`}>{icon}</div>
        <p className='text-sm uppercase text-zinc-600'>{title}</p>
        <p className='text-xl'>{value}</p>
    </div>
    )
}

export default Stat
