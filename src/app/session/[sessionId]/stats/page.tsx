import { buildViewData } from "@/state/buildViewData";
import { SessionStats } from "@/views/sessions"
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

  const {interstitial, data: {session}} = await buildViewData({
    session: sessionId
  })

  if(interstitial) { // Error, loading, etc
    return interstitial 
  }
  
  return (
    <SessionStats
      {...session}
    />
  )
}
