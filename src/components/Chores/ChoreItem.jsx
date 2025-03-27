import { MdModeEditOutline } from "react-icons/md";
import ClickMenu from "../ClickMenu";
import { RiDeleteBinFill } from "react-icons/ri";
import Modal from "../Modal";
import ConfirmDelete from "../ConfirmDelete";
import CreateChoreForm from "./CreateChoreForm";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeChore } from "../../services/apiChores";
import { addPoints } from "../../services/apiUsers";

function ChoreItem({ chore }) {
  const queryClient = useQueryClient();
  const addPointsMutation = useMutation({
    mutationFn: addPoints,
  });
  const completeMutation = useMutation({
    mutationFn: completeChore,
    onSuccess: () => {
      queryClient.invalidateQueries(["chores"]);
    },
  });
  const { title, dueDate, status, priority, _id: choreId, points } = chore;
  const daysLeft = Math.ceil(
    (new Date(dueDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24),
  );

  function handleCompleteChore() {
    completeMutation.mutate(choreId);
    addPointsMutation.mutate(points);
  }

  return (
    <li>
      <div className="grid grid-cols-[10px_1fr_1fr_1fr_1fr_25px] items-center gap-2 border-b-1 border-gray-300 pb-3">
        <div
          className={`h-full w-full ${
            priority.toLowerCase() === "high"
              ? "bg-red-400"
              : priority.toLowerCase() === "medium"
                ? "bg-yellow-400"
                : "bg-green-400"
          }`}
        ></div>
        <p className="font-bold">{title}</p>
        <p className="uppercase">{status}</p>
        <p className="uppercase">{priority}</p>
        <p>
          {daysLeft === 0
            ? "Today"
            : daysLeft === 1
              ? `${daysLeft} day left`
              : `${daysLeft} days left`}
        </p>
        <Modal>
          <ClickMenu.Menu>
            <ClickMenu.Toggle id={choreId} />
            <ClickMenu.List id={choreId}>
              {chore.status === "pending" && (
                <ClickMenu.Button
                  onClick={handleCompleteChore}
                  icon={<IoIosCheckmarkCircle />}
                >
                  Complete
                </ClickMenu.Button>
              )}

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
            <CreateChoreForm choreToEdit={chore} />
          </Modal.Window>
          <Modal.Window name="delete">
            <ConfirmDelete id={choreId} />
          </Modal.Window>
        </Modal>
      </div>
    </li>
  );
}

export default ChoreItem;
