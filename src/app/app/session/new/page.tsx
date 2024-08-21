import { SessionForm } from "@/views/sessions"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New session | Who Slow ",
}
export default function SessionPage() {
  return (
    <SessionForm />
  )
}
