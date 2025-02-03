import { buildViewData } from "@/state/buildViewData"

import { CampaignForm } from "@/views/campaigns"
import { Metadata } from "next"

type CampaignPageProps = {
  params: Promise<{
    campaignId: string,
  }>,
}

export const metadata: Metadata = {
  title: "Edit campaign | Who Slow ",
}

export default async function CampaignPage(props: CampaignPageProps) {
  const params = await props.params;

  const {
    campaignId
  } = params;

  const {interstitial, data: {campaign}} = await buildViewData({campaign: campaignId})

  if(interstitial) { // Error, loading, etc
    return interstitial 
  }
  return (
    <CampaignForm campaignId={campaignId} campaign={campaign} />
  )
}
