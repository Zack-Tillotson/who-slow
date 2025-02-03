import { Metadata } from "next";
import { Campaign } from "@/views/campaigns"
import { buildViewData } from "@/state/buildViewData";

type CampaignPageProps = {
  params: Promise<{
    campaignId: string,
  }>,
}

export const metadata: Metadata = {
  title: "Campaign | Who Slow ",
}

export default async function CampaignPage(props: CampaignPageProps) {
  const params = await props.params;

  const {
    campaignId
  } = params;

  const {interstitial, data: {campaign, sessions}} = await buildViewData({campaign: campaignId, sessions: campaignId})

  if(interstitial) { // Error, loading, etc
    return interstitial 
  }
  
  return (
    <Campaign campaignId={campaignId} campaign={campaign} sessions={sessions} />
  )
}
