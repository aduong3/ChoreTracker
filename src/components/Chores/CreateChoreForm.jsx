import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const priorityOptions = ["LOW", "MEDIUM", "HIGH"];
const recurringOptions = ["DAILY", "WEEKLY", "MONTHLY", "NONE"];

function CreateChoreForm() {
  const [pickedDate, setPickedDate] = useState(new Date());

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Hello");
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
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="points" className="w-26 text-left">
            Points:
          </label>
          <input
            type="text"
            id="points"
            min={5}
            max={20}
            className="flex-1 rounded-md bg-gray-100 px-2 py-1 focus:ring-1 focus:outline-none"
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
            <select id="priority" className="bg-gray-100 px-2 py-1">
              {priorityOptions.map((prio) => (
                <option value={prio} key={prio}>
                  {prio}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-3">
            <label htmlFor="recurring">Repeats:</label>
            <select id="recurring" className="bg-gray-100 px-2 py-1">
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
