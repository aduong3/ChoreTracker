import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="text-center text-xl">
      <nav className="flex flex-col gap-3 py-2">
        <Link to="/app/chores" className="py-1 hover:bg-neutral-300">
          Chores
        </Link>
        <Link to="/app/shop" className="py-1 hover:bg-neutral-300">
          Shop
        </Link>
        <Link to="/app/purchase-history" className="py-1 hover:bg-neutral-300">
          Purchase History
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;
