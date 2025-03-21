import { HiOutlinePlus } from "react-icons/hi";
import Modal from "./Modal";
import AddShopItemForm from "./Shop/AddShopItemForm";

function AddItemButton({ color, AddForm, children }) {
  return (
    <>
      <Modal.Open opens="add">
        <button
          className={`flex cursor-pointer items-center gap-3 rounded-md px-2 py-1 hover:scale-[1.05] ${color}`}
        >
          <HiOutlinePlus />
          <span>{children}</span>
        </button>
      </Modal.Open>
      <Modal.Window name="add">{AddForm}</Modal.Window>
    </>
  );
}

export default AddItemButton;
