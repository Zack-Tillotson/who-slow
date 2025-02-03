import { buildViewData } from "@/state/buildViewData"

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

  const {interstitial, data: {game}} = await buildViewData({game: gameId})

  if(interstitial) { // Error, loading, etc
    return interstitial 
  }

  return (
    <Game gameId={gameId} game={game} />
  )
}
