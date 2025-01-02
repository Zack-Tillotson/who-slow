import getAuthState from "@/state/getAuthState"
import { library } from "@/state/remote"
import { AuthCTA } from "@/views/AuthCTA"
import { GameForm } from "@/views/games"

type PageProps = {
  params: {
    gameId: string,
  },
}

export default async function GamePage({params: {gameId}}: PageProps) {
  const auth = await getAuthState()
  if(!auth.currentUser) {
    return <AuthCTA />
  }

  const game = await library().getGame(gameId)
  return (
    <GameForm gameId={gameId} game={game} />
  )
}
