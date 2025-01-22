import { Metadata } from "next";

import getAuthState from "@/state/getAuthState"
import { library } from "@/state/remote"
import { AuthCTA } from "@/views/AuthCTA"
import { JoinSessionForm } from "@/views/sessions"
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Share session | Who Slow ",
}

export default async function SessionPage() {
  const auth = await getAuthState()
  if(!auth.currentUser) {
    return <AuthCTA />
  }

  return <JoinSessionForm />
}
