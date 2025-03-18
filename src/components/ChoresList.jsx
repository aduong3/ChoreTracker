import ChoreItem from "./ChoreItem";
import ClickMenu from "./ClickMenu";

const chores = [
  {
    id: 1,
    title: "Do Laundry",
    description: "Wash and dry clothes",
    dueDate: "2025-03-20",
    day: "Monday",
    points: 10,
    status: "completed",
    priority: "medium",
    recurring: "weekly",
  },
  {
    id: 2,
    title: "Pay Internet Bill",
    description: "Pay through website",
    dueDate: "2025-03-28",
    day: "Friday",
    points: 15,
    status: "pending",
    priority: "high",
    recurring: "monthly",
  },
  {
    id: 3,
    title: "Wash Dishes",
    description: "Wash after dinner",
    dueDate: "2025-03-21",
    day: "Tuesday",
    points: 5,
    status: "pending",
    priority: "low",
    recurring: "daily",
  },
];

function ChoresList() {
  return (
    <ClickMenu>
      <div>
        <ul className="mt-10 flex flex-col gap-3">
          {chores.map((chore) => (
            <ChoreItem chore={chore} key={chore.id} />
          ))}
        </ul>
      </div>
    </ClickMenu>
  );
}

export default ChoresList;
