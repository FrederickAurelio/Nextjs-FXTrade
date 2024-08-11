import Link from "next/link"
import { HiOutlineLockClosed } from "react-icons/hi2"
import SubmitFormButton from "../_components/SubmitFormButton"
import { ResetPassowrd } from "../_lib/action"

function Page({ searchParams }) {
  const { success } = searchParams;

  return (
    <section className="relative flex h-dvh w-full flex-col items-center justify-center gap-4 bg-zinc-100">
      <div className="container flex w-fit flex-col items-center p-8">
        <HiOutlineLockClosed size={80} className="text-emerald-700" />
        <p className="text-lg font-bold text-emerald-700">Forgot Password?</p>
        <p className="mb-4 w-72 text-center text-sm">
          Enter your email, and we{"'"}ll send you a link to get back into your
          account.
        </p>
        <form
          action={ResetPassowrd}
          className="flex flex-col items-center gap-1"
        >
          <input
            required
            id="email"
            name="email"
            placeholder="Email"
            type="text"
            className={`rounded-xl border-2 border-zinc-300 bg-zinc-100 px-6 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-700 md:w-72 `}
          />
          <SubmitFormButton>
            Send login link
          </SubmitFormButton>
          {success == 1 && <p className="text-sm text-emerald-700 text-center font-semibold w-52">We already sent you the link, Please check your email.</p>}
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
