function CreateChoreForm() {
  return (
    <form className="w-100">
      <div className="flex items-center gap-2">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          className="w-full border-b-2 border-black px-1 focus:outline-none"
        />
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          rows={3}
          className="w-full border-b-2 border-black px-1 focus:outline-none"
        />
      </div>
    </form>
  );
}

export default CreateChoreForm;
