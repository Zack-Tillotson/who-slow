import { buildViewData } from "@/state/buildViewData"

import { Player } from "@/views/players"

type PageProps = {
  params: Promise<{
    playerId: string,
  }>,
}

export default async function PlayerPage(props: PageProps) {
  const params = await props.params;

  const {
    playerId
  } = params;

  const {interstitial, data: {player}} = await buildViewData({player: playerId})

  if(interstitial) { // Error, loading, etc
    return interstitial 
  }
      
  return (
    <>
      <Player playerId={playerId} player={player} />
    </>
  )
}
