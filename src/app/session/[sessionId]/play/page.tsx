import { Metadata } from "next"
import { SessionPlay } from "@/views/sessions"

type PageProps = {
  params: {
    sessionId: string,
  },
}


export const metadata: Metadata = {
  title: "Session | Who Slow ",
}

export default function SessionPage({params: {sessionId}}: PageProps) {
  return (
    <>
      <SessionPlay sessionId={sessionId} />
    </>
  )
}
