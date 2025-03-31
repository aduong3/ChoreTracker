import { MdModeEditOutline } from "react-icons/md";
import { shopIcons } from "../../services/shopIcons";
import ClickMenu from "../ClickMenu";
import Modal from "../Modal";
import AddShopItemForm from "./AddShopItemForm";
import ConfirmDelete from "../ConfirmDelete";
import { RiDeleteBinFill } from "react-icons/ri";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPoints } from "../../services/apiUsers";
import { addToHistory } from "../../services/apiHistory";

function ShopItem({ item }) {
  const queryClient = useQueryClient();
  const addPointsMutation = useMutation({
    mutationFn: addPoints,
    onSuccess: () => {
      queryClient.invalidateQueries(["userPoints"]);
    },
  });
  const addToHistoryMutation = useMutation({
    mutationFn: addToHistory,
  });

  const { title, price, icon, id: itemId } = item;

  function handlePurchaseItem(e) {
    e.preventDefault();
    addPointsMutation.mutate(-price);
    addToHistoryMutation.mutate(item);
  }

  return (
    <div className="relative flex flex-col items-center justify-between gap-3 rounded-md bg-blue-300 px-2 py-3 text-center shadow-lg">
      <span className="text-8xl">{shopIcons[icon]}</span>
      <div className="flex flex-col font-bold">
        <p className="text-md">{price} points</p>
        <p className="text-lg">{title}</p>
      </div>
      <button
        className="cursor-pointer rounded-md px-2 py-1 text-lg hover:bg-blue-400"
        onClick={handlePurchaseItem}
      >
        Claim
      </button>
      <Modal>
        <ClickMenu.Menu>
          <div className="absolute top-0 right-0">
            <ClickMenu.Toggle id={itemId} hoverColor="hover:bg-blue-400" />
          </div>
          <ClickMenu.List id={itemId}>
            <Modal.Open opens="edit">
              <ClickMenu.Button icon={<MdModeEditOutline />}>
                Edit
              </ClickMenu.Button>
            </Modal.Open>
            <Modal.Open opens="delete">
              <ClickMenu.Button icon={<RiDeleteBinFill />}>
                Delete
              </ClickMenu.Button>
            </Modal.Open>
          </ClickMenu.List>
        </ClickMenu.Menu>

        <Modal.Window name="edit">
          <AddShopItemForm itemToEdit={item} />
        </Modal.Window>
        <Modal.Window name="delete">
          <ConfirmDelete id={itemId} type="shop" />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default ShopItem;
