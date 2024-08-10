import { Suspense } from "react";
import { formatCurrency } from "../_lib/helpers"
import LogoutButton from "./LogoutButton";
import Table from "./Table";
import Spinner from "../_components/Spinner";


async function TablePage({data}) {
  const { transactions, balance, username } = data;

  if (balance === undefined)
    return <p className="p-2 text-lg font-semibold">Offline..</p>;

  return (
    <Suspense fallback={<Spinner />}>
      <div className="flex h-full w-full flex-col overflow-y-auto overflow-x-hidden bg-zinc-50 p-3">
        <div className="mb-8 flex items-start justify-between">
          <h1 className="text-xl font-semibold md:text-2xl">
            Balance: {formatCurrency(balance, "CNY")}
          </h1>
          <LogoutButton username={username} />
        </div>
        <Table
          transactions={transactions}
        />
      </div>
    </Suspense>
  )
}

export default TablePage
