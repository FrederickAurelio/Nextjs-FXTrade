import { createClient } from "@supabase/supabase-js";

export async function GET(request) {
  try {
    const user_id = request.nextUrl.searchParams.get('user_id')
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY);

    const { data: transactions } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", user_id)

    const { data: userBalance } = await supabase
      .from("userBalance")
      .select("*")
      .eq("user_id", user_id)

    const { username, balance } = userBalance[0];
    const data = {
      transactions,
      username,
      balance
    }

    return Response.json(data);
  } catch (err) {
    return Response.json({ message: err.message });
  }
}