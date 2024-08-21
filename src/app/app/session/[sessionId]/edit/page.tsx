import { SessionForm } from "@/views/sessions"
import { Metadata } from "next";

type PageProps = {
  params: {
    sessionId: string,
  },
}

export const metadata: Metadata = {
  title: "Edit session | Who Slow ",
}
export default function SessionPage({params: {sessionId}}: PageProps) {
  return (
    <SessionForm sessionId={sessionId} />
  )
}
