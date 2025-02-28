'use client'

import { ViewParams } from "@/components/view/types";
import { NiceLoading } from "@/components/loading";
import { CampaignForm as FormCampaign } from "./components/CampaignForm";

export function CampaignForm({viewState}: ViewParams) {

  const {
    options: {campaign: campaignId}, 
    data: {campaign},
    meta: {isDataReady},
  } = viewState

  if(!isDataReady) {
    return <NiceLoading />
  }

  return <FormCampaign campaignId={campaignId} campaign={campaign} />
}
