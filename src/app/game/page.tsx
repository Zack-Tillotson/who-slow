import { Metadata } from "next"
import { Games } from "@/views/games"
import { buildViewData } from "@/state/buildViewData"

export const metadata: Metadata = {
  title: "Games | Who Slow ",
}

export default async function GamePage() {

  const {interstitial, data: {games}} = await buildViewData({games: null})

  if(interstitial) { // Error, loading, etc
    return interstitial 
  }
      
  return (
    <Games games={games} />
  )
}
