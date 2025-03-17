import { HiOutlineDotsVertical } from "react-icons/hi";

function ChoreItem({ chore }) {
  const { title, day, dueDate, status, priority, recurring } = chore;

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
        <p>{recurring}</p>
        <div className="cursor-pointer self-end">
          <HiOutlineDotsVertical />{" "}
        </div>
      </div>
    </li>
  );
}

export default ChoreItem;
