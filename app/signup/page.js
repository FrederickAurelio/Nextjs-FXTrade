import Link from "next/link";
import Logo from "../_components/Logo";
import SignInGithub from "../_components/SignInGithub";
import SubmitFormButton from "../_components/SubmitFormButton";
import { CreateAccount } from "../_lib/action";

function Page() {
  return (
    <section className="relative flex h-dvh w-full flex-col items-center justify-center gap-4 bg-zinc-100">
      <div className="container w-fit p-8">
        <Logo textSize="text-3xl" iconSize={40} className="mb-6" />
        <form
          action={CreateAccount}
          className="flex flex-col items-center gap-1"
        >
          <p className="text-emerald-700 w-full font-semibold px-2 text-start">Create Account
          </p>
          <input
            required
            id="username"
            name="username"
            placeholder="Username"
            type="text"
            className={`rounded-xl border-2 border-zinc-300 bg-zinc-100 px-6 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-700 md:w-72 `}
          />
          <input
            required
            id="email"
            name="email"
            placeholder="Email"
            type="text"
            className={`rounded-xl border-2 border-zinc-300 bg-zinc-100 px-6 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-700 md:w-72 `}
          />
          <input
            required
            id="password"
            name="password"
            placeholder="Password"
            type="password"
            className={`rounded-xl border-2 border-zinc-300 bg-zinc-100 px-6 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-700 md:w-72 `}
          />
          <SubmitFormButton>
            Sign Up
          </SubmitFormButton>
        </form>
      </div>

      <SignInGithub />

      <div className="container w-80 text-center">
        <p className="text-sm">
          Have an account?{" "}
          <Link href="/login/" className="text-xl font-semibold text-emerald-700">
            Log in
          </Link>
        </p>
      </div>

      <Link
        href="/"
        className="absolute left-1 top-1 cursor-pointer font-semibold text-emerald-700 hover:scale-105"
      >
        {"<--- Back"}
      </Link>
    </section>
  )
}

export default Page
