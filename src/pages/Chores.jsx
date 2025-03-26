import ChoresList from "../components/Chores/ChoresList";
import ChoreStatList from "../components/Chores/ChoreStatList";
import AddItemButton from "../components/AddItemButton";
import CreateChoreForm from "../components/Chores/CreateChoreForm";
import { useQuery } from "@tanstack/react-query";
import { fetchAllChores } from "../services/apiChores";

function Chores() {
  const {
    isPending,
    data: apichores,
    error,
  } = useQuery({
    queryKey: ["chores"],
    queryFn: fetchAllChores,
  });
  // console.log(apichores);
  if (isPending) return <h2>Loading...</h2>;
  const chores = apichores?.data?.chores;
  const amountOfChores = apichores.results;
  const choresDone = chores.filter(
    (chore) => chore.status === "completed",
  ).length;
  return (
    <>
      <div className="mb-4 grid grid-cols-4 gap-x-12 gap-y-4">
        <h1 className="col-span-full text-3xl text-zinc-800">Chores</h1>
        <ChoreStatList
          amountOfChores={amountOfChores}
          choresDone={choresDone}
        />
      </div>
      <AddItemButton color="bg-red-300" AddForm={<CreateChoreForm />}>
        Add Chore
      </AddItemButton>
      <ChoresList chores={chores} />
    </>
  );
}

export default Chores;
