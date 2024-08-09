
type SessionPageProps = {
  params: {
    sessionId: string,
  },
}

export default function SessionStatsPage({params: {sessionId}}: SessionPageProps) {
  return (
    <>
      Session "{sessionId}" Stats
    </>
  )
}
