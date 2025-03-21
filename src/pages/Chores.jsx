import ChoresList from "../components/Chores/ChoresList";
import CreateChore from "../components/Chores/CreateChore";
import ChoreStatList from "../components/Chores/ChoreStatList";

function Chores() {
  return (
    <>
      <div className="mb-4 grid grid-cols-4 gap-x-12 gap-y-4 py-4">
        <h1 className="col-span-full text-3xl text-zinc-800">Chores</h1>
        <ChoreStatList />
      </div>
      <CreateChore />
      <ChoresList />
    </>
  );
}

export default Chores;
