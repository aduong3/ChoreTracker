import { IoSunnyOutline } from "react-icons/io5";

import Logo from "./Logo";
import Logout from "./Logout";
import { useQuery } from "@tanstack/react-query";
import { getPoints } from "../services/apiUsers";

function Header() {
  const { data } = useQuery({
    queryKey: ["userPoints"],
    queryFn: getPoints,
    refetchOnWindowFocus: true,
  });
  const usersPoints = data?.data?.points;
  const usersName = data?.data?.name;
  return (
    <header className="z-100 col-span-full flex h-full items-center justify-between px-8 py-4 shadow-xs">
      <Logo textSize="text-xl" isLink={true} />
      <p className="text-lg font-bold">You have {usersPoints} points</p>
      <div className="flex items-center gap-4">
        <div className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 font-bold hover:bg-zinc-200">
          <p className="text-lg">{usersName}</p>
        </div>
        {/* <span className="cursor-pointer rounded-md p-2 text-xl hover:bg-zinc-200">
          <IoSunnyOutline />
        </span> */}
        <Logout />
      </div>
    </header>
  );
}

export default Header;
