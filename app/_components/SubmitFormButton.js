"use client"
import { useFormStatus } from 'react-dom';
import MiniSpinner from "./MiniSpinner"

function SubmitFormButton({ children }) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className={`mb-4 mt-2 w-full rounded-xl bg-emerald-700 py-[6px] font-semibold text-zinc-50 disabled:cursor-not-allowed disabled:bg-zinc-300 flex items-center justify-center`}
    >
      {pending ? <MiniSpinner /> : ""}
      {children}
    </button>
  )
}

export default SubmitFormButton