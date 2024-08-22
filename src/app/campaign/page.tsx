import { Campaigns } from "@/views/campaigns";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Campaigns | Who Slow ",
}

export default function CampaignPage() {
  return (
    <>
      <Campaigns />
    </>
  )
}
