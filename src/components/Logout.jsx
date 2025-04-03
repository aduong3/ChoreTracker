import { useMutation } from "@tanstack/react-query";
import { logout } from "../services/apiUsers";
import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import toast from "react-hot-toast";

function Logout() {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("User has logged out!");
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.message);
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
