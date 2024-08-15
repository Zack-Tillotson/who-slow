import { Session } from "@/views/sessions"

type PageProps = {
  params: {
    sessionId: string,
  },
}

export default function SessionPage({params: {sessionId}}: PageProps) {
  return (
    <>
      <Session sessionId={sessionId} />
    </>
  )
}
