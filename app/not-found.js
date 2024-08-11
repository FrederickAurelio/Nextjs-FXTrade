import Link from "next/link";

function PageNotFound() {
  return (
    <div className="bg-zinc-100 h-dvh pt-48 flex flex-col items-center text-3xl font-semibold text-emerald-700">
      <p>Page Not Found</p>
      <Link className="flex justify-center items-center gap-2 hover:underline" href="/">{"<-- Back"}</Link>
    </div>
  );
}

export default PageNotFound;