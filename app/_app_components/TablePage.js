import { formatCurrency } from "../_lib/helpers"
import LogoutButton from "./LogoutButton";
import Table from "./Table";
import { createClient } from "/utils/supabase/server";

async function TablePage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser()

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/transactions?user_id=${user.id}`);
  const { transactions, balance, username } = await res.json();

  return (
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
  )
}

export default TablePage
