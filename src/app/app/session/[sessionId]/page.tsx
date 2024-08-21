import { Session } from "@/views/sessions"
import { Metadata } from "next";

type PageProps = {
  params: {
    sessionId: string,
  },
}

export const metadata: Metadata = {
  title: "Setup session | Who Slow ",
}

export default function SessionPage({params: {sessionId}}: PageProps) {
  return (
    <>
      <Session sessionId={sessionId} />
    </>
  )
}
