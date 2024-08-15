import { Game } from '@/views/games'

type PageProps = {
  params: {
    gameId: string,
  },
}

export default function GamePage({params: {gameId}}: PageProps) {
  return (
    <Game gameId={gameId} />
  )
}
