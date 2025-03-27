import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signUp } from "../services/apiUsers";
import { useState } from "react";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: () => {},
  });
  const navigate = useNavigate();

  function handleBackButton(e) {
    e.preventDefault();
    navigate(-1);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password || !passwordConfirm) return;

    const newUser = {
      name,
      email,
      password,
      passwordConfirm,
    };

    mutation.mutate(newUser);

    setName("");
    setEmail("");
    setPassword("");
    setPasswordConfirm("");

    navigate("/app");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-svh flex-col items-center justify-center gap-6 text-center"
    >
      <div className="grid grid-cols-[150px_1fr]">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          className="rounded-md bg-neutral-100 p-1 focus:ring-1 focus:outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-[150px_1fr]">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          className="rounded-md bg-neutral-100 p-1 focus:ring-1 focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
        />
      </div>
      <div className="grid grid-cols-[150px_1fr]">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          className="rounded-md bg-neutral-100 p-1 focus:ring-1 focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />
      </div>
      <div className="grid grid-cols-[150px_1fr]">
        <label htmlFor="passwordConfirm">Confirm Password:</label>
        <input
          type="password"
          id="passwordConfirm"
          className="rounded-md bg-neutral-100 p-1 focus:ring-1 focus:outline-none"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          autoComplete="new-password"
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
          Submit
        </button>
      </div>
    </form>
  );
}

export default SignUp;
