"use client"
import { SignInWithGitHub } from "../_lib/action";
import Github from "/public/features2.png"
import Image from "next/image";

function SignInGithub() {
  return (
    <div className="container p-2 w-80 text-center hover:scale-105 duration-200">
      <div
        className="flex items-center justify-center text-lg font-semibold text-emerald-700 cursor-pointer"
      ><button onClick={() => SignInWithGitHub()} className="flex gap-2">
          <Image alt="github logo" className="w-[1.7rem] h-[1.7rem]" src={Github} />
          <p>SignIn with Github</p>
        </button>
      </div>
    </div>
  )
}

export default SignInGithub
