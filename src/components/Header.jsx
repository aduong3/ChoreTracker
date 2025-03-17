import { Link } from "react-router-dom";
import Logo from "./Logo";

function Header() {
  return (
    <header className='col-span-full h-full shadow-md z-100 '>
      <nav className="flex justify-between py-4 px-8 text-xl ">
        <Logo textSize='text-1xl' isLink={true}/>
        <div className='flex gap-8'>

        </div>
      </nav>
    </header>
  );
}

export default Header;
