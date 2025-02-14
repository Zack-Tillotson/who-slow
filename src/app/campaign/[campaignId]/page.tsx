import { Metadata } from "next";
import { Campaign } from "@/views/campaigns"

import { buildViewData } from "@/components/view/buildViewData";
import { ViewContainer } from "@/components/view";

type CampaignPageProps = {
  params: Promise<{
    campaignId: string,
  }>,
}

export const metadata: Metadata = {
  title: "Campaign | Who Slow ",
}

export async function generateStaticParams() {
  return [{campaignId: 'xxx'}] // XXX https://github.com/vercel/next.js/issues/61213
}

export default async function CampaignPage(props: CampaignPageProps) {
  const params = await props.params;

  const {
    campaignId
  } = params

  const viewState = await buildViewData({campaign: campaignId, sessions: campaignId})

  return (
    <ViewContainer viewState={viewState} View={Campaign} />
  )
}
