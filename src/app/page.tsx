import { Metadata } from "next"

import { Welcome } from "@/views/welcome"
import { SessionCTA } from "@/views/session"

export const metadata: Metadata = {
  title: "Sessions | Who Slow ",
}

export default function DashboardPage() {
  return (
    <>
      <Welcome />
      <SessionCTA />
    </>
  );
}
