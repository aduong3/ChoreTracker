import AddItemButton from "../components/AddItemButton";
import AddShopItemForm from "../components/Shop/AddShopItemForm";
import ShopList from "../components/Shop/ShopList";

function Shop() {
  return (
    <>
      <div className="py-4">
        <h1 className="col-span-full text-3xl text-zinc-800">Shop</h1>
      </div>
      <AddItemButton color="bg-blue-300" AddForm={<AddShopItemForm />}>
        Add Reward
      </AddItemButton>
      <ShopList />
    </>
  );
}

export default Shop;
