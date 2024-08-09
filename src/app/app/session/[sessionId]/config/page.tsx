
type SessionPageProps = {
  params: {
    sessionId: string,
  },
}

export default function SessionConfigPage({params: {sessionId}}: SessionPageProps) {
  return (
    <>
      Session "{sessionId}" Config
    </>
  )
}
