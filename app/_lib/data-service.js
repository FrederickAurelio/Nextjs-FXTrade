import { createClient } from "/utils/supabase/server";

export async function getTransactions() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser()

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/transactions?user_id=${user.id}`, { next: { tags: ['transactions'] } });
  const data = await res.json();

  return data;
}