import { Metadata } from "next";

import { JoinSessionForm } from "@/views/sessions"
import { redirect } from "next/navigation";
import { buildViewData } from "@/components/view/buildViewData";

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

  const {interstitial, data: {sessionId}} = await buildViewData({sessionId: shareCode})

  if(interstitial) { // Error, loading, etc
    return interstitial 
  }

  if(!shareCode) {
    return <JoinSessionForm />
  }

  if(!sessionId) {
    return <JoinSessionForm isInvalidCode paramCode={shareCode} />  
  }

  redirect(`/session/${sessionId}/play`)
}
