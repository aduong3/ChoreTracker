import { GiChocolateBar, GiSteak } from "react-icons/gi";
import ShopItem from "./ShopItem";
import { FaBowlFood, FaGamepad } from "react-icons/fa6";
import { MdLocalMovies } from "react-icons/md";

const fakeShopItems = [
  {
    id: 1,
    title: "Buy Small Snack",
    price: 1500,
    icon: <GiChocolateBar />,
  },
  {
    id: 2,
    title: "Buy Big Snack",
    price: 2500,
    icon: <FaBowlFood />,
  },
  {
    id: 3,
    title: "Fancy Meal",
    price: 5000,
    icon: <GiSteak />,
  },
  {
    id: 4,
    title: "New Game",
    price: 10000,
    icon: <FaGamepad />,
  },
  {
    id: 5,
    title: "Movie Theater",
    price: 7500,
    icon: <MdLocalMovies />,
  },
];

function ShopList() {
  return (
    <div className="grid auto-rows-[200px] grid-cols-5 gap-6 py-5">
      {fakeShopItems.map((shopItem) => (
        <ShopItem item={shopItem} key={shopItem.id} />
      ))}
    </div>
  );
}

export default ShopList;
