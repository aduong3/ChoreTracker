import { GiChocolateBar } from "react-icons/gi";
import ShopItem from "./ShopItem";

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
    icon: "",
  },
  {
    id: 3,
    title: "Fancy Meal",
    price: 5000,
    icon: "",
  },
  {
    id: 4,
    title: "New Game",
    price: 10000,
    icon: "",
  },
  {
    id: 5,
    title: "Movie Theater",
    price: 7500,
    icon: "",
  },
];

function ShopList() {
  return (
    <div className="grid grid-cols-4 gap-6">
      {fakeShopItems.map((shopItem) => (
        <ShopItem item={shopItem} key={shopItem.id} />
      ))}
    </div>
  );
}

export default ShopList;
