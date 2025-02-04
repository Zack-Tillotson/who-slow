import { Metadata } from "next";
import { buildViewData } from "@/components/view/buildViewData";
import { ViewContainer } from "@/components/view";
import { Players } from "@/views/players";

export const metadata: Metadata = {
  title: "Players | Who Slow ",
}

export default async function PlayerPage() {

  const viewState = await buildViewData({players: true})
  
  return (
    <ViewContainer viewState={viewState} View={Players} />
  )
}