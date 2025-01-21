import getAuthState from "@/state/getAuthState";
import { library } from "@/state/remote";
import { SessionStats } from "@/views/sessions"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Session | Who Slow ",
}

type PageProps = {
  params: Promise<{
    sessionId: string,
  }>,
}

export default async function SessionPage(props: PageProps) {
  const params = await props.params;

  const {
    sessionId
  } = params;

  await getAuthState()

  const {session, game, players} = await library().getFilledSession(sessionId)

  return (
    <SessionStats
      session={session}
      game={game}
      players={players}
    />
  )
}
