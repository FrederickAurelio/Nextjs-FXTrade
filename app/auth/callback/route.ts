import { NextResponse } from "next/server";
import { createClient } from "../../../utils/supabase/server";
// The client you created from the Server-Side Auth instructions

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset?link=true`;
      return NextResponse.redirect(redirectUrl);
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(
    `${origin}/reset?error_description=Email+link+is+invalid+or+has+expired`
  );
}
