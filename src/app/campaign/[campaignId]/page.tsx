import { Metadata } from "next";
import { Campaign } from "@/views/campaigns"
import getAuthState from "@/state/getAuthState";
import { AuthCTA } from "@/views/AuthCTA";
import { library } from "@/state/remote";

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

  const auth = await getAuthState()
  if(!auth.currentUser) {
    return <AuthCTA />
  }

  const campaign = await library().getCampaign(campaignId)
  const filledSessions = await library().getCampaignSessions(campaignId)

  return (
    <Campaign campaignId={campaignId} campaign={campaign} filledSessions={filledSessions} />
  )
}
