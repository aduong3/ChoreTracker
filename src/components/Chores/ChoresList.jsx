import ChoreItem from "./ChoreItem";

function ChoresList({ chores }) {
  return (
    <div>
      <ul className="no-scrollbar mt-6 flex h-[70vh] flex-col gap-2 overflow-auto">
        {chores.map((chore) => (
          <ChoreItem chore={chore} key={chore._id} />
        ))}
      </ul>
    </div>
  );
}

export default ChoresList;
