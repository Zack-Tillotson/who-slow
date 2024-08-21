import { PlayerForm } from "@/views/players"

type PageProps = {
  params: {
    playerId: string,
  },
}

export default function PlayerPage({params: {playerId}}: PageProps) {
  return (
    <PlayerForm playerId={playerId} />
  )
}
