import { Metadata } from "next";

import { Session } from "@/views/sessions"
import { buildViewData } from "@/state/buildViewData";

type PageProps = {
  params: Promise<{
    sessionId: string,
  }>,
}

export const metadata: Metadata = {
  title: "Setup session | Who Slow ",
}

export default async function SessionPage(props: PageProps) {
  const params = await props.params;

  const {
    sessionId
  } = params;

  const {interstitial, data: {session}} = await buildViewData({
    session: sessionId
  })

  if(interstitial) { // Error, loading, etc
    return interstitial 
  }

  return (
    <Session
      sessionId={sessionId}
      {...session}
    />
  )
}
