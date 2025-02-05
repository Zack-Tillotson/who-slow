import { FormCampaign } from "@/components/form/FormCampaign";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New campaign | Who Slow ",
}
export default function CampaignPage() {
  return (
    <FormCampaign />
  )
}
