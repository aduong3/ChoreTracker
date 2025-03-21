function ConfirmDelete({ onCloseModal }) {
  return (
    <div className="flex flex-col gap-8">
      <h3 className="text-xl font-bold">
        Are you sure you want to delete this item?
      </h3>
      <div className="flex items-center justify-center gap-24">
        <button
          className="cursor-pointer rounded-md px-3 py-2 hover:bg-zinc-400"
          onClick={onCloseModal}
        >
          Cancel
        </button>
        <button
          className="cursor-pointer rounded-md px-3 py-2 hover:bg-red-600"
          onClick={onCloseModal}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
