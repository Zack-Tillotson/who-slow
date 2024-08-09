
type SessionPageProps = {
  params: {
    sessionId: string,
  },
}

export default function SessionPage({params: {sessionId}}: SessionPageProps) {
  return (
    <>
      Session "{sessionId}"
    </>
  )
}
