import { library } from "@/state/remote";
import { Campaigns } from "@/views/campaigns";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Campaigns | Who Slow ",
}

export default async function CampaignPage() {
  const  campaigns = await library.getCampaigns()
      
  return (
    <Campaigns campaigns={campaigns} />
  )
}
