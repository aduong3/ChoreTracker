import { IoSunnyOutline } from "react-icons/io5";
import pfp from "./../imgs/pfp.jpeg";
import Logo from "./Logo";
import { CiLogout } from "react-icons/ci";

function Header() {
  return (
    <header className="z-100 col-span-full flex h-full items-center justify-between px-8 py-4 shadow-xs">
      <Logo textSize="text-xl" isLink={true} />
      <div className="flex items-center gap-4">
        <div className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 font-bold hover:bg-zinc-200">
          <img
            src={pfp}
            alt="test profile picture"
            className="h-8 w-8 translate-x-[-6px] scale-150 rounded-full object-cover"
          />
          <p className="text-lg">Andrew</p>
        </div>
        <span className="cursor-pointer rounded-md p-2 text-xl hover:bg-zinc-200">
          <IoSunnyOutline />
        </span>
        <span className="cursor-pointer rounded-md p-2 text-xl hover:bg-zinc-200">
          <CiLogout />
        </span>
      </div>
    </header>
  );
}

export default Header;
