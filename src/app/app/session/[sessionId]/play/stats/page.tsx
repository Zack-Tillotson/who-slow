import { SessionStats } from "@/views/sessions"

type PageProps = {
  params: {
    sessionId: string,
  },
}

export default function SessionPage({params: {sessionId}}: PageProps) {
  return (
    <>
      <SessionStats sessionId={sessionId} />
    </>
  )
}
