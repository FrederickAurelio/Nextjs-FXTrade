import Link from "next/link"
import { HiOutlineKey } from "react-icons/hi2"
import SubmitFormButton from "../_components/SubmitFormButton"
import { ChangePassword } from "../_lib/action"

function Page({ searchParams }) {
  const { error_description, link } = searchParams;
  if (error_description || !link)
    throw new Error(error_description || "Click forgot password if you want to change your password")

  return (
    <section className="relative flex h-dvh w-full flex-col items-center justify-center gap-4 bg-zinc-100">
      <div className="container flex w-fit flex-col items-center p-8">
        <HiOutlineKey size={80} className="text-emerald-700" />
        <p className="text-lg font-bold text-emerald-700">Reset Password</p>
        <p className="mb-4 w-72 text-center text-sm">
          Enter your new password.
        </p>
        <form
          action={ChangePassword}
          className="flex flex-col items-center gap-1"
        >
          <input
            id="password"
            name="password"
            placeholder="Password"
            type="password"
            className={`rounded-xl border-2 border-zinc-300 bg-zinc-100 px-6 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-700 md:w-72 `}
          />
          <SubmitFormButton>
            Change Password
          </SubmitFormButton>
        </form>
      </div>

      <div className="container w-80 text-center">
        <Link href="/login/" className="font-semibold text-emerald-700">
          Back to Login
        </Link>
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
