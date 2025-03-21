import { HiOutlinePlus } from "react-icons/hi";
import Modal from "../Modal";
import CreateChoreForm from "./CreateChoreForm";

function CreateChore() {
  return (
    <>
      <Modal.Open opens="add">
        <button className="flex cursor-pointer items-center gap-3 rounded-md bg-red-300/50 px-2 py-1 hover:scale-[1.05]">
          <HiOutlinePlus />
          <span>Add Chore</span>
        </button>
      </Modal.Open>
      <Modal.Window name="add">
        <CreateChoreForm />
      </Modal.Window>
    </>
  );
}

export default CreateChore;
