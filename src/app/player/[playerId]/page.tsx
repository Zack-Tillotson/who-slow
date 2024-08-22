import { Player } from "@/views/players"

type PageProps = {
  params: {
    playerId: string,
  },
}

export default function PlayerPage({params: {playerId}}: PageProps) {
  return (
    <>
      <Player playerId={playerId} />
    </>
  )
}
