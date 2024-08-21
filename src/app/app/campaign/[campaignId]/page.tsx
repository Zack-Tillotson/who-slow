import { Metadata } from "next";
import { Campaign } from "@/views/campaigns"

type CampaignPageProps = {
  params: {
    campaignId: string,
  },
}

export const metadata: Metadata = {
  title: "Campaign | Who Slow ",
}

export default function CampaignPage({params: {campaignId}}: CampaignPageProps) {
  return (
    <Campaign campaignId={campaignId} />
  )
}
