"use server"

import { redirect } from "next/navigation";
import { createClient } from "/utils/supabase/server";

export async function CreateAccount(formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const username = formData.get("username")

  if (!email || !password | !username)
    throw new Error("Email/Password/Username is required");

  const supabase = createClient();
  // Checking Username
  const { data } = await supabase
    .from("userBalance")
    .select("email")
    .eq("username", username)
    .single();

  if (data)
    throw new Error("Username already exist.")

  // Create User Account
  const { data: { user } } = await supabase.auth.signUp({
    email,
    password,
  })

  // If email is already used for other account
  if (!user)
    throw new Error("User already exists (Use another email)")

  // Creating UserBalance
  const { error } = await supabase
    .from('userBalance')
    .insert(
      {
        username: username.slice(0, 20),
        balance: 100000,
        user_id: user.id,
        email: email,
      }
    )

  if (error)
    throw new Error(error.message);

  redirect("/app");
}

export async function LoginWithPassword(formData) {
  let email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password)
    throw new Error("Email/Password required")

  const supabase = createClient();

  // If user input Username
  if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
    // If not an email, treat it as a username
    const { data, error } = await supabase
      .from("userBalance")
      .select("email")
      .eq("username", email)
      .single();

    if (error)
      throw new Error("Username not found");

    email = data.email;
  }

  // Login
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  if (error)
    throw new Error("Invalid Email/Password")

  redirect("/app");
}

export async function SignInWithGitHub() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_AUTH_CALLBACK}/github`
    },
  })

  if (data.url) {
    redirect(data.url) // use the redirect API for your server framework
  }
}

export async function ResetPassowrd(formData) {
  const email = formData.get("email");
  if (!email)
    throw new Error("Email is required");

  const supabase = createClient();
  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: process.env.NEXT_PUBLIC_AUTH_CALLBACK
  })

  // show success text in client
  redirect("/forgot?success=1")
}

export async function ChangePassword(formData) {
  const password = formData.get("password");

  if (!password)
    throw new Error("Please insert new password");

  const supabase = createClient();
  const { error } = await supabase.auth.updateUser({ password })

  if (error)
    throw new Error(error.message)

  redirect("/app");
}