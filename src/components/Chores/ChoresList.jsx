import ChoreItem from "./ChoreItem";

function ChoresList({ chores }) {
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
