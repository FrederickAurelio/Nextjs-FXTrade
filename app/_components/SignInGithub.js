"use client"
import { useTransition } from "react";
import { SignInWithGitHub } from "../_lib/action";
import Github from "/public/features2.png"
import Image from "next/image";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function SignInGithub() {
  const [isPending, startTransition] = useTransition();
  function handleClick() {
    startTransition(() => {
      SignInWithGitHub();
    })
  }

  return (
    <button
      disabled={isPending}
      onClick={handleClick}
      className="container p-2 w-80 text-center hover:scale-105 duration-200 flex text-lg font-semibold text-emerald-700 cursor-pointerflex gap-2 items-center justify-center disabled:cursor-not-allowed disabled:hover:scale-100">
      {isPending ?
        <AiOutlineLoading3Quarters className={`animate-spin text-stone-300`} /> :
        <Image alt="github logo" className="w-[1.7rem] h-[1.7rem]" src={Github} />}
      <p className={`${isPending ? "text-stone-300" : ""}`}>SignIn with Github</p>
    </button>
  )
}

export default SignInGithub
