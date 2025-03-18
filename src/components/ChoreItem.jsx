import { MdModeEditOutline } from "react-icons/md";
import ClickMenu from "./ClickMenu";
import { RiDeleteBinFill } from "react-icons/ri";

function ChoreItem({ chore }) {
  const {
    title,
    day,
    dueDate,
    status,
    priority,
    recurring,
    id: choreId,
  } = chore;
  const daysLeft = Math.ceil(
    (new Date(dueDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24),
  );

  return (
    <li>
      <div className="grid grid-cols-[10px_1fr_1fr_1fr_1fr_20px] gap-2 border-b-1 border-gray-300 pb-3">
        <div
          className={
            priority === "high"
              ? "bg-red-400"
              : priority === "medium"
                ? "bg-yellow-400"
                : "bg-green-400"
          }
        ></div>
        <p className="font-bold">{title}</p>
        <p>{status}</p>
        <p>{priority}</p>
        <p>{daysLeft === 0 ? "Today" : `${daysLeft} days left`}</p>
        <ClickMenu.Menu>
          <ClickMenu.Toggle id={choreId} />
          <ClickMenu.List id={choreId}>
            <ClickMenu.Button
              onClick={() => {
                console.log("edit");
              }}
              icon={<MdModeEditOutline />}
            >
              Edit
            </ClickMenu.Button>
            <ClickMenu.Button
              onClick={() => {
                console.log("delete");
              }}
              icon={<RiDeleteBinFill />}
            >
              Delete
            </ClickMenu.Button>
          </ClickMenu.List>
        </ClickMenu.Menu>
      </div>
    </li>
  );
}

export default ChoreItem;
