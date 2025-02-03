import { buildViewData } from "@/state/buildViewData";

import { SessionPlay } from "@/views/sessions"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Session | Who Slow ",
}

type PageProps = {
  params: Promise<{
    sessionId: string,
  }>,
}

export default async function SessionPage(props: PageProps) {
  const params = await props.params;

  const {
    sessionId
  } = params;

  const {interstitial, auth, data: {session}} = await buildViewData({
    session: sessionId
  })

  if(interstitial) { // Error, loading, etc
    return interstitial 
  }

  return (
    <SessionPlay
      sessionId={sessionId}
      {...session}
      userId={auth?.currentUser?.uid ?? ''}
    />
  )
}
