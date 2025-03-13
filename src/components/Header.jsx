import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <nav className="flex justify-between py-4 px-8 text-xl bg-sky-400 ">
        <Link to="/">Home</Link>
        <div className='flex gap-8'>
          <Link to="/app">Stats</Link>
          <Link to="/chores">Chores</Link>
          <Link to="/shop">Shop</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
