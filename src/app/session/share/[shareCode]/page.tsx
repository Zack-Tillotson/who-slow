import { Metadata } from "next";

import getAuthState from "@/state/getAuthState"
import { library } from "@/state/remote"
import { AuthCTA } from "@/views/AuthCTA"
import { JoinSessionForm } from "@/views/sessions"
import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{
    shareCode?: string,
  }>,
}

export const metadata: Metadata = {
  title: "Share session | Who Slow ",
}

export default async function SessionPage(props: PageProps) {
  const params = await props.params;

  const {
    shareCode,
  } = params;

  const auth = await getAuthState()
  if(!auth.currentUser) {
    return <AuthCTA />
  }

  if(!shareCode) {
    return <JoinSessionForm />  
  }

  const sessionId = await library().getSessionIdFromShareCode(shareCode)
  if(!sessionId) {
    return <JoinSessionForm isInvalidCode paramCode={shareCode} />  
  }

  redirect(`/session/${sessionId}/play`)
}
