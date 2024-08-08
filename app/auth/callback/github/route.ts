import { NextResponse } from "next/server";
import { createClient } from "../../../../utils/supabase/server";
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
        .eq("user_id", user.id)
        .single();

      // If there is no row, Create the new one
      if (!row) {
        let username = user.user_metadata.full_name;

        // Check if Username already exist
        const { data, error: error2 } = await supabase
          .from("userBalance")
          .select("email")
          .eq("username", username)
          .single();

        // if yes add random # to the username
        if (data) username = `${username}#${user.id.slice(0, 5)}`;

        if (error2) throw new Error(error2.message);

        // Creating userBalance row
        const { error } = await supabase.from("userBalance").insert({
          username: username,
          balance: 100000,
          user_id: user.id,
          email: user.email,
        });

        if (error) throw new Error(error.message);
      }

      const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}/app`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}/app`);
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}`);
}
