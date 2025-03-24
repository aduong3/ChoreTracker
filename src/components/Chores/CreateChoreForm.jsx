import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addNewChore } from "../../services/apiChores";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const priorityOptions = ["LOW", "MEDIUM", "HIGH"];
const recurringOptions = ["DAILY", "WEEKLY", "MONTHLY", "NONE"];

function CreateChoreForm({ editChore, onCloseModal }) {
  const queryClient = useQueryClient();
  const [choreTitle, setChoreTitle] = useState(
    editChore ? editChore.title : "",
  );
  const [choreDesc, setChoreDesc] = useState(
    editChore ? editChore.description : "",
  );
  const [chorePoints, setChorePoints] = useState(
    editChore ? editChore.points : 1,
  );
  const [pickedDate, setPickedDate] = useState(
    editChore ? editChore.dueDate : new Date(),
  );
  const [chorePrio, setChorePrio] = useState(
    editChore ? editChore.priority : priorityOptions[0],
  );
  const [choreRecur, setChoreRecur] = useState(
    editChore ? editChore.recurring : recurringOptions[0],
  );
  const mutation = useMutation({
    mutationFn: addNewChore,
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
      recurring: choreRecur,
    };

    mutation.mutate(newChore);

    setChoreTitle("");
    setChoreDesc("");
    setChorePoints(1);
    setPickedDate(new Date());
    setChorePrio(priorityOptions[0]);
    setChoreRecur(recurringOptions[0]);

    onCloseModal();
  }

  return (
    <div className="flex flex-col gap-10">
      <h2 className="self-center text-3xl">Create New Chore</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <label htmlFor="title" className="w-26 text-left">
            Title:
          </label>
          <input
            type="text"
            id="title"
            className="flex-1 rounded-md bg-gray-100 px-2 py-1 focus:ring-1 focus:outline-none"
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
            className="flex-1 resize-none rounded-md bg-gray-100 px-2 py-1 focus:ring-1 focus:outline-none"
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
            className="flex-1 rounded-md bg-gray-100 px-2 py-1 focus:ring-1 focus:outline-none"
            value={chorePoints}
            onChange={(e) => setChorePoints(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center gap-2">
          <label htmlFor="dueDate">Finish Date:</label>
          <DatePicker
            selected={pickedDate}
            onChange={(date) => setPickedDate(date)}
            className="cursor-pointer rounded-md bg-gray-100 py-1 text-center"
          />
        </div>
        <div className="flex justify-around">
          <div className="flex items-center gap-3">
            <label htmlFor="priority">Priority:</label>
            <select
              id="priority"
              className="bg-gray-100 px-2 py-1"
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
          <div className="flex items-center gap-3">
            <label htmlFor="recurring">Repeats:</label>
            <select
              id="recurring"
              className="bg-gray-100 px-2 py-1"
              value={choreRecur}
              onChange={(e) => setChoreRecur(e.target.value)}
            >
              {recurringOptions.map((recur) => (
                <option value={recur} key={recur}>
                  {recur}
                </option>
              ))}
            </select>
          </div>
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
