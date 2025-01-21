import getAuthState from "@/state/getAuthState"
import { library } from "@/state/remote"
import { AuthCTA } from "@/views/AuthCTA"
import { GameForm } from "@/views/games"

type PageProps = {
  params: Promise<{
    gameId: string,
  }>,
}

export default async function GamePage(props: PageProps) {
  const params = await props.params;

  const {
    gameId
  } = params;

  const auth = await getAuthState()
  if(!auth.currentUser) {
    return <AuthCTA />
  }

  const game = await library().getGame(gameId)
  return (
    <GameForm gameId={gameId} game={game} />
  )
}
