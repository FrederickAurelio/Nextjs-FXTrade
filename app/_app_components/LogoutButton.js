"use client"
import { HiOutlineLogout } from "react-icons/hi";
import { SignOutAcount } from "../_lib/action";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function LogoutButton({ username }) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(() => {
      SignOutAcount();
      toast.success("Logout Successfull");
    })
  }

  return (
    <div className="flex items-center gap-1">
      <span className={`text-sm ${isPending ? "text-stone-300" : ""}`}>{username}</span>
      <button disabled={isPending} onClick={handleClick} className="text-rose-700 hover:scale-110">
        {isPending ? <AiOutlineLoading3Quarters className="animate-spin" /> : <HiOutlineLogout size={20} />}
      </button>
    </div>
  );
}

export default LogoutButton;
