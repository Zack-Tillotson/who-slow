import { Metadata } from "next"
import { SessionStats } from "@/views/sessions"

type PageProps = {
  params: {
    sessionId: string,
  },
}

export const metadata: Metadata = {
  title: "Session stats | Who Slow ",
}

export default function SessionPage({params: {sessionId}}: PageProps) {
  return (
    <SessionStats sessionId={sessionId} />
  )
}
