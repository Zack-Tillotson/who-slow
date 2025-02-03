import { Metadata } from "next";

import { Campaigns } from "@/views/campaigns";
import { buildViewData } from "@/state/buildViewData";

export const metadata: Metadata = {
  title: "Campaigns | Who Slow ",
}

export default async function CampaignPage() {

  const {interstitial, data: {campaigns}} = await buildViewData({campaigns: null})

  if(interstitial) { // Error, loading, etc
    return interstitial 
  }
  
  return (
    <Campaigns campaigns={campaigns} />
  )
}
