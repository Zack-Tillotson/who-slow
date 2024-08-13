import { Campaign } from "@/views/campaigns"

type CampaignPageProps = {
  params: {
    campaignId: string,
  },
}

export default function CampaignPage({params: {campaignId}}: CampaignPageProps) {
  return (
    <>
      <Campaign campaignId={campaignId} />
    </>
  )
}
