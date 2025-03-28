import { useMutation, useQueryClient } from "@tanstack/react-query";
import { options } from "../../services/shopIcons";
import Select from "react-select";
import { createNewShopItem, editShopItem } from "../../services/apiShops";
import { useState } from "react";

function AddShopItemForm({ itemToEdit, onCloseModal }) {
  let editIconOption;
  if (itemToEdit) {
    editIconOption = options.find((option) => option.value === itemToEdit.icon);
  }
  const [shopTitle, setShopTitle] = useState(itemToEdit?.title ?? "");
  const [shopPrice, setShopPrice] = useState(itemToEdit?.price ?? 200);
  const [shopIcon, setShopIcon] = useState(editIconOption ?? "");

  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: createNewShopItem,
    onSuccess: () => {
      queryClient.invalidateQueries(["shopItems"]);
    },
  });
  const editMutation = useMutation({
    mutationFn: ({ item, id }) => editShopItem(item, id),
    onSuccess: () => {
      queryClient.invalidateQueries(["shopItems"]);
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(icon.value);
    const iconData = shopIcon.value;

    const newShopItem = {
      title: shopTitle,
      price: shopPrice,
      icon: iconData,
    };
    if (itemToEdit)
      editMutation.mutate({ item: newShopItem, id: itemToEdit.id });
    else createMutation.mutate(newShopItem);

    setShopTitle("");
    setShopPrice(200);
    setShopIcon("");

    onCloseModal();
  }

  return (
    <div className="flex flex-col gap-10">
      <h2 className="self-center text-2xl">Create New Reward</h2>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex items-center gap-2">
          <label className="w-26 text-left" htmlFor="title">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={shopTitle}
            onChange={(e) => setShopTitle(e.target.value)}
            className="flex-1 rounded-md bg-gray-200 px-2 py-1 focus:ring-1 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="w-26 text-left" htmlFor="price">
            Price:
          </label>
          <input
            type="text"
            id="price"
            value={shopPrice}
            onChange={(e) => setShopPrice(e.target.value)}
            className="flex-1 rounded-md bg-gray-200 px-2 py-1 focus:ring-1 focus:outline-none"
          />
        </div>

        <div className="flex items-center justify-center gap-3">
          <label htmlFor="icon">Icon:</label>
          <Select
            options={options}
            value={shopIcon}
            onChange={(selected) => setShopIcon(selected)}
            id="icon"
            className="rounded-md bg-gray-200 px-2 py-1 uppercase"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddShopItemForm;
