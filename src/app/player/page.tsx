import { Metadata } from "next";
import { Players } from "@/views/players";

import { buildViewData } from "@/state/buildViewData";

export const metadata: Metadata = {
  title: "Players | Who Slow ",
}

export default async function PlayerPage() {

  const {interstitial, data: {players}} = await buildViewData({players: null})

  if(interstitial) { // Error, loading, etc
    return interstitial 
  }
      
  return (
    <Players players={players} />
  )
}
