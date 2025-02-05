import { ViewContainer } from "@/components/view";
import { buildViewData } from "@/components/view/buildViewData"

import { Game } from "@/views/games"

type PageProps = {
  params: Promise<{
    gameId: string,
  }>,
}

export default async function GamePage(props: PageProps) {
  const params = await props.params;

  const {
    gameId
  } = params

  const viewState = await buildViewData({game: gameId})

  return (
    <ViewContainer viewState={viewState} View={Game} />
  )
}
