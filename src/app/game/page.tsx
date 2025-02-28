import { Metadata } from "next"
import { Games } from "@/views/games"
import { buildViewData } from "@/components/view/buildViewData"
import { ViewContainer } from "@/components/view"

export const metadata: Metadata = {
  title: "Games | Who Slow ",
}

export const dynamic = 'force-static'

export default async function GamePage() {

  const viewState = await buildViewData({games: true})

  return (
    <ViewContainer viewState={viewState} View={Games} />
  )
}
