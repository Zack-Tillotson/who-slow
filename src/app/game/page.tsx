import { Metadata } from "next";
import { Games } from "@/views/games";

export const metadata: Metadata = {
  title: "Games | Who Slow ",
}

export default function GamePage() {
  return (
    <Games />
  )
}
