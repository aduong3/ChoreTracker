import { useMutation } from "@tanstack/react-query";
import { logout } from "../services/apiUsers";
import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";

function Logout() {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      navigate("/");
    },
  });

  return (
    <span
      className="cursor-pointer rounded-md p-2 text-xl hover:bg-zinc-200"
      onClick={() => mutation.mutate()}
    >
      <CiLogout />
    </span>
  );
}

export default Logout;
