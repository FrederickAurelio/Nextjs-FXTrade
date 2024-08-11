import { NextResponse } from "next/server";
import { createClient } from "../../../../utils/supabase/server";
import { createClient as CreateClientServer } from "@supabase/supabase-js";
// The client you created from the Server-Side Auth instructions

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // Checking userBalance row
      const { data: row } = await supabase
        .from("userBalance")
        .select("email")
        .eq("user_id", user.id);

      // If there is no row, Create the new one
      if (row.length === 0) {
        let username = user.user_metadata.full_name;

        // Check if Username already exist
        const { data, error: error2 } = await supabase
          .from("userBalance")
          .select("email")
          .eq("username", username);

        // if yes add random # to the username
        if (data.length !== 0) username = `${username}#${user.id.slice(0, 5)}`;

        if (error2) throw new Error(error2.message);

        // Creating userBalance row
        const supabaseServer = CreateClientServer(
          process.env.NEXT_PUBLIC_SUPABASE_URL,
          process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY
        );
        const { error } = await supabaseServer.from("userBalance").insert({
          username: username,
          balance: 100000,
          user_id: user.id,
          email: user.email,
        });

        if (error) throw new Error(error.message);
        return NextResponse.redirect(`${origin}/app`);
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}`);
}
