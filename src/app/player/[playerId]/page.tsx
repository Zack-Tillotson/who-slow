import getAuthState from "@/state/getAuthState"
import { library } from "@/state/remote"
import { AuthCTA } from "@/views/AuthCTA"

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

  const auth = await getAuthState()
  if(!auth.currentUser) {
    return <AuthCTA />
  }

  const player = await library().getPlayer(playerId)
  return (
    <>
      <Player playerId={playerId} player={player} />
    </>
  )
}
