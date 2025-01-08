import { Metadata } from "next";
import { headers } from 'next/headers'

import firebase from "@/state/firebase";
import { library } from "@/state/remote";
import { AuthCTA } from "@/views/AuthCTA";
import { Campaigns } from "@/views/campaigns";
import { Campaign } from "@/state/types";
import getAuthState from "@/state/getAuthState";

export const metadata: Metadata = {
  title: "Campaigns | Who Slow ",
}

export default async function CampaignPage() {

  const auth = await getAuthState()
  if(!auth.currentUser) {
    return <AuthCTA />
  }

  let campaigns: Campaign[] = []
  try {
    campaigns = await library().getCampaigns()
  } catch(e) {
    console.log('DB Error', e)
  }
      
  return (
    <Campaigns campaigns={campaigns} />
  )
}
