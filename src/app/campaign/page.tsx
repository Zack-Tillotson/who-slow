import { Metadata } from "next"

import { buildViewData } from "@/components/view/buildViewData"
import { ViewContainer } from "@/components/view"
import { Campaigns } from "@/views/campaigns"

export const metadata: Metadata = {
  title: "Campaigns | Who Slow ",
}

export const dynamic = 'force-static'

export default async function CampaignPage() {

  const viewState = await buildViewData({campaigns: true})
  
  return (
    <ViewContainer viewState={viewState} View={Campaigns} />
  )
}
