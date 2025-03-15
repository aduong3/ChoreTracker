import { Link } from "react-router-dom"

function Logo({textSize, isLink}) {

    if(isLink)
        return <Link className={`font-bold ${textSize}`} to='/'>Chore<span className='text-red-500'>Tracker</span> 2.0</Link>
    
    return (
        <h2 className={`font-bold ${textSize}`}>Chore<span className='text-red-500'>Tracker</span> 2.0</h2>
    )
}

export default Logo
