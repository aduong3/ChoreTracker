import { useNavigate } from "react-router-dom";

function LogIn() {
  const navigate = useNavigate();

  function handleBackButton(e) {
    e.preventDefault();
    navigate(-1);
  }

  return (
    <form className="flex h-svh flex-col items-center justify-center gap-6 text-center">
      <div className="grid grid-cols-[150px_1fr]">
        <label>Email:</label>
        <input
          type="email"
          className="rounded-md bg-neutral-100 p-1 focus:ring-1 focus:outline-none"
        />
      </div>
      <div className="grid grid-cols-[150px_1fr]">
        <label>Password:</label>
        <input
          type="password"
          className="rounded-md bg-neutral-100 p-1 focus:ring-1 focus:outline-none"
        />
      </div>
      <div className="flex gap-24">
        <button
          onClick={handleBackButton}
          className="cursor-pointer rounded-md p-2 hover:bg-gray-100"
        >
          Back
        </button>
        <button
          type="submit"
          className="cursor-pointer rounded-md p-2 hover:bg-green-200"
          onClick={() => navigate("/app")}
        >
          Log In
        </button>
      </div>
    </form>
  );
}

export default LogIn;
