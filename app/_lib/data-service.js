import toast from "react-hot-toast";
import { createClient } from '@/utils/supabase/server'
const supabase = createClient();

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error)
    toast.error(error.message)

}
