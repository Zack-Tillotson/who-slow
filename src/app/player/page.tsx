import { Metadata } from "next";
import { Players } from "@/views/players";

export const metadata: Metadata = {
  title: "Players | Who Slow ",
}

export default function PlayerPage() {
  return (
    <Players />
  )
}
