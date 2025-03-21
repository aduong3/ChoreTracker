import ChoresList from "../components/Chores/ChoresList";
import ChoreStatList from "../components/Chores/ChoreStatList";
import AddItemButton from "../components/AddItemButton";
import CreateChoreForm from "../components/Chores/CreateChoreForm";

function Chores() {
  return (
    <>
      <div className="mb-4 grid grid-cols-4 gap-x-12 gap-y-4 py-4">
        <h1 className="col-span-full text-3xl text-zinc-800">Chores</h1>
        <ChoreStatList />
      </div>
      <AddItemButton color="bg-green-300" AddForm={<CreateChoreForm />}>
        Add Chore
      </AddItemButton>
      <ChoresList />
    </>
  );
}

export default Chores;
