import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteChore } from "../services/apiChores";
import { deleteShopItem } from "../services/apiShops";
import toast from "react-hot-toast";

function ConfirmDelete({ onCloseModal, id, type }) {
  const queryClient = useQueryClient();
  const choreMutation = useMutation({
    mutationFn: deleteChore,
    onSuccess: () => {
      queryClient.invalidateQueries(["chores"]);
      toast.success("Chore deleted!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const shopMutation = useMutation({
    mutationFn: deleteShopItem,
    onSuccess: () => {
      queryClient.invalidateQueries(["shopItems"]);
      toast.success("Reward deleted!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function handleDeleteChore(e) {
    e.preventDefault();
    if (type === "chore") choreMutation.mutate(id);
    else if (type === "shop") shopMutation.mutate(id);
    onCloseModal();
  }

  return (
    <div className="flex flex-col gap-8">
      <h3 className="text-xl font-bold">
        Are you sure you want to delete this item?
      </h3>
      <div className="flex items-center justify-center gap-24">
        <button
          className="cursor-pointer rounded-md px-3 py-2 hover:bg-zinc-400"
          onClick={onCloseModal}
        >
          Cancel
        </button>
        <button
          className="cursor-pointer rounded-md px-3 py-2 hover:bg-red-600"
          onClick={handleDeleteChore}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
