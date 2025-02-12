import { Metadata } from "next";

import { buildViewData } from "@/components/view/buildViewData";
import { ViewContainer } from "@/components/view";
import { ShareSession } from "@/views/sessions";

type PageProps = {
  params: Promise<{
    shareCode?: string,
  }>,
}

export const metadata: Metadata = {
  title: "Share session | Who Slow ",
}

export const dynamic = 'force-static'

export default async function SessionPage(props: PageProps) {
  const params = await props.params;

  const {
    shareCode,
  } = params;

  const viewState = await buildViewData({sessionId: shareCode})

  return (
    <ViewContainer viewState={viewState} View={ShareSession} />
  )
}
