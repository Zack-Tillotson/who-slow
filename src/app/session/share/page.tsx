import { Metadata } from "next";

import { JoinSession } from "@/views/sessions"
import { buildViewData } from "@/components/view/buildViewData";
import { ViewContainer } from "@/components/view";

export const metadata: Metadata = {
  title: "Share session | Who Slow ",
}

export default async function SessionPage() {
  const viewState = await buildViewData()

  return (
    <ViewContainer viewState={viewState} View={JoinSession} />
  )
}
