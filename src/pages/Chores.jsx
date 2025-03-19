import ChoresList from "../components/ChoresList";
import CreateChore from "../components/CreateChore";
import StatList from "../components/StatList";

function Chores() {
  return (
    <>
      <div className="mb-4 grid grid-cols-4 gap-x-12 gap-y-4 py-4">
        <h1 className="col-span-full text-3xl text-zinc-800">Chores</h1>
        <StatList />
      </div>
      <CreateChore />
      <ChoresList />
    </>
  );
}

export default Chores;
