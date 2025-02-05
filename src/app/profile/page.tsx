import { Metadata } from "next";
import { Profile } from "@/views/profile";

export const metadata: Metadata = {
  title: "Profile | Who Slow ",
}

export default async function PlayerPage() {
  return (
    <Profile />
  )
}
