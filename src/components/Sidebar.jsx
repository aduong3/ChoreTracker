import { Link } from "react-router-dom"

function Sidebar() {
    return (
        <div className='flex flex-col gap-3 text-xl my-4 text-center'>
            <Link to="/app" className='hover:bg-neutral-200 py-1 w-full'>Stats</Link>
            <Link to="/app/chores" className='hover:bg-neutral-200'>Chores</Link>
            <Link to="/app/shop" className='hover:bg-neutral-200'>Shop</Link>
        </div>
    )
}

export default Sidebar
