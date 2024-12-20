import { Metadata } from "next";
import { Campaign } from "@/views/campaigns"
import getAuthState from "@/state/getAuthState";
import { AuthCTA } from "@/views/AuthCTA";
import { library } from "@/state/remote";

type CampaignPageProps = {
  params: {
    campaignId: string,
  },
}

export const metadata: Metadata = {
  title: "Campaign | Who Slow ",
}

export default async function CampaignPage({params: {campaignId}}: CampaignPageProps) {
  const auth = await getAuthState()
  if(!auth.currentUser) {
    return <AuthCTA />
  }

  const campaign = await library().getCampaign(campaignId)
  const sessions = await library().getCampaignSessions(campaignId)
      
  return (
    <Campaign campaignId={campaignId} campaign={campaign} sessions={sessions} />
  )
}
