import { CampaignForm } from "@/views/campaigns"
import { Metadata } from "next"

type CampaignPageProps = {
  params: {
    campaignId: string,
  },
}

export const metadata: Metadata = {
  title: "Edit campaign | Who Slow ",
}

export default function CampaignPage({params: {campaignId}}: CampaignPageProps) {
  return (
    <CampaignForm campaignId={campaignId} />
  )
}
