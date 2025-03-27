import { shopIcons } from "../../services/shopIcons";

function ShopItem({ item }) {
  const { title, price, icon } = item;
  return (
    <div className="flex cursor-pointer flex-col items-center justify-center gap-5 rounded-md bg-blue-300 px-2 py-3 text-center shadow-lg">
      <span className="text-8xl">{shopIcons[icon]}</span>
      <div className="flex flex-col font-bold">
        <p className="text-lg">{price} points</p>
        <p className="text-xl">{title}</p>
      </div>
    </div>
  );
}

export default ShopItem;
