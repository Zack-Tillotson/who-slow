import { SessionPlay } from "@/views/sessions"

type PageProps = {
  params: {
    sessionId: string,
  },
}

export default function SessionPage({params: {sessionId}}: PageProps) {
  return (
    <>
      <SessionPlay sessionId={sessionId} />
    </>
  )
}
