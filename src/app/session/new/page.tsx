import { ViewContainer } from "@/components/view";
import { buildViewData } from "@/components/view/buildViewData";
import { SessionForm } from "@/views/sessions"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New session | Who Slow ",
}

export default async function SessionPage() {
  
  const viewState = await buildViewData({games: true, campaigns: true, players: true})

  return (
    <ViewContainer viewState={viewState} View={SessionForm} />
  )
}
