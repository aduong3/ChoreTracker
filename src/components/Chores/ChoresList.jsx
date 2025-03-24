import ChoreItem from "./ChoreItem";
import ClickMenu from "../ClickMenu";
import { useQuery } from "@tanstack/react-query";
import { fetchAllChores } from "../../services/apiChores";

// const chores = [
//   {
//     id: 1,
//     title: "Do Laundry",
//     description: "Wash and dry clothes",
//     dueDate: "2025-03-24",
//     day: "Monday",
//     points: 10,
//     status: "completed",
//     priority: "medium",
//     recurring: "weekly",
//   },
//   {
//     id: 2,
//     title: "Pay Internet Bill",
//     description: "Pay through website",
//     dueDate: "2025-03-28",
//     day: "Friday",
//     points: 15,
//     status: "pending",
//     priority: "high",
//     recurring: "monthly",
//   },
//   {
//     id: 3,
//     title: "Wash Dishes",
//     description: "Wash after dinner",
//     dueDate: "2025-03-30",
//     day: "Tuesday",
//     points: 5,
//     status: "pending",
//     priority: "low",
//     recurring: "daily",
//   },
// ];

function ChoresList() {
  const {
    isPending,
    data: apichores,
    error,
  } = useQuery({
    queryKey: ["chores"],
    queryFn: fetchAllChores,
  });

  const chores = apichores?.data?.chores;

  if (isPending) return <h2>Loading...</h2>;

  return (
    <div>
      <ul className="mt-10 flex flex-col gap-3">
        {chores.map((chore) => (
          <ChoreItem chore={chore} key={chore._id} />
        ))}
      </ul>
    </div>
  );
}

export default ChoresList;
