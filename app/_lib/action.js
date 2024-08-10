"use server"

import { redirect } from "next/navigation";
import { createClient } from "/utils/supabase/server";
import { createClient as CreateClientServer } from "@supabase/supabase-js";
import { revalidateTag } from "next/cache";

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
  const supabaseServer = CreateClientServer(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY);

  const { error } = await supabaseServer
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
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback/github`
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
    redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`
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

export async function SignOutAcount() {
  console.log("testt")
  const supabase = createClient();
  const { error } = await supabase.auth.signOut()
  if (error)
    throw new Error(error.message)

  redirect("/login")
}

export async function BuyTransactions(asset, assetQuantity) {
  const buyQuantity = Number(assetQuantity);
  const supabase = createClient();
  const supabaseServer = CreateClientServer(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY);

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/latestcurrency`)
  const latestCur = await res.json();
  const latestCurAsset = latestCur.rates[asset]
  const totalPrice = buyQuantity / latestCurAsset;

  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user)
      throw new Error("Authentication is expired. Please Login again.")

    // Check if user balance is sufficient
    const { data: { balance } } = await supabaseServer
      .from('userBalance')
      .select('balance')
      .eq("user_id", user.id)
      .single()

    if (totalPrice > balance)
      throw new Error("Sufficients Balance")

    // Check if user own the asset before
    const { data: transactions } = await supabaseServer
      .from('transactions')
      .select('*')
      .eq('asset', asset)
      .eq("user_id", user.id)
      .single()

    if (!transactions) {
      // Create new transactions and update the balance
      await Promise.all([
        supabaseServer
          .from('transactions')
          .insert([
            {
              asset: asset,
              avgBuyPrice: latestCurAsset,
              quantity: buyQuantity,
              user_id: user.id,
            },
          ]),
        supabaseServer
          .from('userBalance')
          .update({ balance: (balance - totalPrice) })
          .eq('user_id', user.id)
      ])
    } else {
      await Promise.all([
        supabaseServer
          .from('transactions')
          .update({
            avgBuyPrice: (transactions.avgBuyPrice * transactions.quantity + latestCurAsset * buyQuantity) / (transactions.quantity + buyQuantity),
            quantity: (transactions.quantity + buyQuantity),
          })
          .eq("id", transactions.id),
        supabaseServer
          .from('userBalance')
          .update({ balance: (balance - totalPrice) })
          .eq('user_id', user.id)
      ])
    }

    revalidateTag("transactions");
    return { type: "success" }
  } catch (err) {
    return { type: "error", message: err.message }
    // throw new Error(err.message)
  }
}

export async function SellTransactions(asset, assetQuantity) {
  const sellQuantity = Number(assetQuantity);
  const supabase = createClient();
  const supabaseServer = CreateClientServer(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY);

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/latestcurrency`)
  const latestCur = await res.json();
  const latestCurAsset = latestCur.rates[asset]
  const totalPrice = sellQuantity / latestCurAsset;

  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user)
      throw new Error("Authentication is expired. Please Login again.")

    // Fetch user balance
    const { data: { balance } } = await supabaseServer
      .from('userBalance')
      .select('balance')
      .eq("user_id", user.id)
      .single()

    // Check if really own the asset
    const { data: transactions } = await supabaseServer
      .from('transactions')
      .select('*')
      .eq('asset', asset)
      .eq("user_id", user.id)
      .single()

    if (!transactions)
      throw new Error(`You don't own ${asset} currency`)

    if (sellQuantity > transactions.quantity)
      throw new Error(`You only own ${transactions.quantity} ${asset}`)

    if (sellQuantity === transactions.quantity) {
      await Promise.all([
        supabaseServer
          .from('transactions')
          .delete()
          .eq("id", transactions.id),
        supabaseServer
          .from('userBalance')
          .update({ balance: (balance + totalPrice) })
          .eq('user_id', user.id)
      ])
    } else {
      await Promise.all([
        supabaseServer
          .from('transactions')
          .update({
            quantity: (transactions.quantity - sellQuantity),
          })
          .eq("id", transactions.id),
        supabaseServer
          .from('userBalance')
          .update({ balance: (balance + totalPrice) })
          .eq('user_id', user.id)
      ])
    }

    revalidateTag("transactions");
    return { type: "success" }
  } catch (err) {
    return { type: "error", message: err.message }
    // throw new Error(err.message)
  }
}