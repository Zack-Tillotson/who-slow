import { SessionForm } from "@/views/sessions"

type PageProps = {
  params: {
    sessionId: string,
  },
}

export default function SessionPage({params: {sessionId}}: PageProps) {
  return (
    <SessionForm sessionId={sessionId} />
  )
}
