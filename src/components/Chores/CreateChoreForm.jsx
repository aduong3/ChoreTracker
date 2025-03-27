import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addNewChore, editChore } from "../../services/apiChores";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const priorityOptions = ["low", "medium", "high"];

function CreateChoreForm({ choreToEdit, onCloseModal }) {
  const queryClient = useQueryClient();
  const [choreTitle, setChoreTitle] = useState(
    choreToEdit ? choreToEdit.title : "",
  );
  const [choreDesc, setChoreDesc] = useState(
    choreToEdit ? choreToEdit.description : "",
  );
  const [chorePoints, setChorePoints] = useState(
    choreToEdit ? choreToEdit.points : 1,
  );
  const [pickedDate, setPickedDate] = useState(
    choreToEdit ? choreToEdit.dueDate : new Date(),
  );
  const [chorePrio, setChorePrio] = useState(
    choreToEdit ? choreToEdit.priority : priorityOptions[0],
  );

  const addMutation = useMutation({
    mutationFn: addNewChore,
    onSuccess: () => {
      queryClient.invalidateQueries(["chores"]);
    },
  });
  const editMutation = useMutation({
    mutationFn: ({ chore, id }) => editChore(chore, id),
    onSuccess: () => {
      queryClient.invalidateQueries(["chores"]);
    },
  });

  function handleSubmit(e) {
    e.preventDefault();

    const newChore = {
      title: choreTitle,
      description: choreDesc,
      points: chorePoints,
      dueDate: pickedDate,
      priority: chorePrio,
    };
    if (!choreToEdit) addMutation.mutate(newChore);
    else editMutation.mutate({ chore: newChore, id: choreToEdit._id });

    setChoreTitle("");
    setChoreDesc("");
    setChorePoints(1);
    setPickedDate(new Date());
    setChorePrio(priorityOptions[0]);

    onCloseModal();
  }

  return (
    <div className="flex flex-col gap-10">
      <h2 className="self-center text-2xl">Create New Chore</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <label htmlFor="title" className="w-26 text-left">
            Title:
          </label>
          <input
            type="text"
            id="title"
            className="flex-1 rounded-md bg-gray-200 px-2 py-1 focus:ring-1 focus:outline-none"
            value={choreTitle}
            onChange={(e) => setChoreTitle(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="description" className="w-26 text-left">
            Description:
          </label>
          <textarea
            rows="4"
            cols="50"
            id="description"
            className="flex-1 resize-none rounded-md bg-gray-200 px-2 py-1 focus:ring-1 focus:outline-none"
            value={choreDesc}
            onChange={(e) => setChoreDesc(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="points" className="w-26 text-left">
            Points:
          </label>
          <input
            type="text"
            id="points"
            min={1}
            max={20}
            className="flex-1 rounded-md bg-gray-200 px-2 py-1 focus:ring-1 focus:outline-none"
            value={chorePoints}
            onChange={(e) => setChorePoints(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center gap-2">
          <label htmlFor="dueDate">Finish Date:</label>
          <DatePicker
            selected={pickedDate}
            id="dueDate"
            onChange={(date) => setPickedDate(date)}
            className="cursor-pointer rounded-md bg-gray-200 py-1 text-center"
          />
        </div>
        <div className="flex items-center justify-center gap-3">
          <label htmlFor="priority">Priority:</label>
          <select
            id="priority"
            className="rounded-md bg-gray-200 px-2 py-1 uppercase"
            value={chorePrio}
            onChange={(e) => setChorePrio(e.target.value)}
          >
            {priorityOptions.map((prio) => (
              <option value={prio} key={prio}>
                {prio}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-auto cursor-pointer self-center rounded-md bg-zinc-300 px-3 py-2 hover:bg-zinc-400"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateChoreForm;
