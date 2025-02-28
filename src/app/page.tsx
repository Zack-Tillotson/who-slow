import { Metadata } from "next"

import { Welcome } from "@/views/welcome"
import { SessionCTA } from "@/views/session"

export const metadata: Metadata = {
  title: "Sessions | Who Slow ",
}

export async function generateStaticParams() {
  return [{}]
}

export default function DashboardPage() {
  return (
    <>
      <Welcome />
      <SessionCTA />
    </>
  );
}
