import getAuthState from "@/state/getAuthState"
import { library } from "@/state/remote"
import { AuthCTA } from "@/views/AuthCTA"
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

export default async function CampaignPage({params: {campaignId}}: CampaignPageProps) {
  const auth = await getAuthState()
  if(!auth.currentUser) {
    return <AuthCTA />
  }

  const campaign = await library().getCampaign(campaignId)
  return (
    <CampaignForm campaignId={campaignId} campaign={campaign} />
  )
}
