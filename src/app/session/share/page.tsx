import { Metadata } from "next";

import { JoinSessionForm } from "@/views/sessions"
import { buildViewData } from "@/components/view/buildViewData";

export const metadata: Metadata = {
  title: "Share session | Who Slow ",
}

export default async function SessionPage() {
  const {interstitial} = await buildViewData()

  if(interstitial) { // Error, loading, etc
    return interstitial 
  }

  return <JoinSessionForm />
}
