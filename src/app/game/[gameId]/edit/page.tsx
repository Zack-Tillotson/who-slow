import { GameForm } from "@/views/games"

type PageProps = {
  params: {
    gameId: string,
  },
}

export default function GamePage({params: {gameId}}: PageProps) {
  return (
    <GameForm gameId={gameId} />
  )
}
