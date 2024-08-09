"use client"
import { HiOutlineLogout } from "react-icons/hi";
import { SignOutAcount } from "../_lib/action";

function LogoutButton({ username }) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-sm">{username}</span>
      <button onClick={() => SignOutAcount()} className="text-rose-700 hover:scale-110">
        <HiOutlineLogout size={20} />
      </button>
    </div>
  );
}

export default LogoutButton;
