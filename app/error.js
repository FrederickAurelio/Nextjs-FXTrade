"use client"

import Link from "next/link";

export default function Error({ error, reset }) {
  return (
    <main className='bg-stone-100 flex h-[90dvh] justify-center items-center flex-col gap-6'>
      <h1 className='text-3xl font-semibold'>Something went wrong!</h1>
      <p className='text-lg text-rose-800'>{error.message}</p>

      <button onClick={reset} className='active:bg-emerald-800 rounded-3xl inline-block bg-emerald-700 text-stone-200 px-6 py-3 text-lg'>
        Try again
      </button>
      <Link
        href="/"
        className="absolute left-1 top-1 cursor-pointer font-semibold text-emerald-700 text-xl hover:scale-105"
      >
        {"<--- Back"}
      </Link>
    </main>
  );
}
