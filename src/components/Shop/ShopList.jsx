import ShopItem from "./ShopItem";
import { getAllShopItems } from "../../services/apiShops";
import { useQuery } from "@tanstack/react-query";

function ShopList() {
  const {
    isPending,
    data: apiShop,
    error,
  } = useQuery({
    queryKey: ["shopItems"],
    queryFn: getAllShopItems,
  });
  if (isPending) {
    return (
      <div className="flex h-svh w-svw items-center justify-center">
        <h2>Loading...</h2>
      </div>
    );
  }
  const rewardItems = apiShop?.data?.shops;

  return (
    <div className="grid auto-rows-[230px] grid-cols-4 gap-6 py-5">
      {rewardItems.map((shopItem) => (
        <ShopItem item={shopItem} key={shopItem.id} />
      ))}
    </div>
  );
}

export default ShopList;
