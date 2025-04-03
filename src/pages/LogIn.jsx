import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logIn } from "../services/apiUsers";
import toast from "react-hot-toast";

function LogIn() {
  const mutation = useMutation({
    mutationFn: logIn,
    onSuccess: () => {
      navigate("/app", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const { isPending } = mutation;

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleBackButton(e) {
    e.preventDefault();
    navigate(-1);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;

    toast.promise(
      mutation.mutate({ email, password }),
      {
        loading: "Logging User In!",
        success: "Successfully logged in!",
      },
      {
        style: {
          minWidth: "250px",
        },
        loading: {
          duration: 4000,
        },
      },
    );
    // mutation.mutate({ email, password });
    setEmail("");
    setPassword("");
  }

  if (isPending) {
    return (
      <div className="flex h-svh w-svw items-center justify-center">
        <h2>Logging In...</h2>
      </div>
    );
  }
  return (
    <form
      className="flex h-svh flex-col items-center justify-center gap-6 text-center"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-[150px_1fr]">
        <label>Email:</label>
        <input
          type="email"
          className="rounded-md bg-neutral-100 p-1 focus:ring-1 focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
        />
      </div>
      <div className="grid grid-cols-[150px_1fr]">
        <label>Password:</label>
        <input
          type="password"
          className="rounded-md bg-neutral-100 p-1 focus:ring-1 focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
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
        >
          Log In
        </button>
      </div>
    </form>
  );
}

export default LogIn;
