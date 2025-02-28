import { CampaignForm } from "@/views/campaigns/components/CampaignForm"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "New campaign | Who Slow ",
}
export default function CampaignPage() {
  return (
    <CampaignForm />
  )
}
