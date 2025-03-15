import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";

function Homepage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return <div className='bg-neutral-100 min-h-svh max-w-full flex flex-col items-center justify-center gap-16'>
        <Logo textSize='text-6xl' isLink={false}/>
        <di className='flex flex-col gap-6'>
        <p className='text-2xl italic'>Forgetting to track your chores? Struggling to keep your indulgences in check?</p>
        <p className='text-xl italic'>Keep your chores organized, stay accountable, and reward yourself for staying on top of things!</p>
        </di>
        <div className='flex gap-8'>
          {isLoggedIn && (
            <>
          <Link className='cursor-pointer hover:bg-neutral-200 py-2 px-3 rounded-sm text-xl' to='/app' onClick={()=>{setIsLoggedIn(true)}}>Log In</Link>
         <button className='cursor-pointer hover:bg-neutral-200 py-2 px-3 rounded-sm text-xl'>Sign Up</button>
         </>)}
         {!isLoggedIn && <Link to='/app' className='cursor-pointer hover:bg-neutral-200 py-2 px-3 rounded-sm text-xl'>Continue</Link>}
        </div>
    </div>
;
}

export default Homepage;
