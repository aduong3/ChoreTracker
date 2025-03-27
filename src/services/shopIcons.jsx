import { GiChocolateBar, GiSteak } from "react-icons/gi";
import {
  FaBasketShopping,
  FaBook,
  FaBowlFood,
  FaGamepad,
} from "react-icons/fa6";
import { MdLocalMovies } from "react-icons/md";
import { BiCoffeeTogo } from "react-icons/bi";

export const shopIcons = {
  snack: <GiChocolateBar />,
  fancyMeal: <GiSteak />,
  meal: <FaBowlFood />,
  newGame: <FaGamepad />,
  movie: <MdLocalMovies />,
  coffee: <BiCoffeeTogo />,
  book: <FaBook />,
  shopping: <FaBasketShopping />,
};

export const options = Object.keys(shopIcons).map((key) => ({
  value: key,
  label: (
    <div className="flex items-center gap-2">
      <span>{shopIcons[key]}</span>
      <span className="capitalize">{key}</span>
    </div>
  ),
}));
