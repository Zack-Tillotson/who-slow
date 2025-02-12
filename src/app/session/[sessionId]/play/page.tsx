import { ViewContainer } from "@/components/view";
import { buildViewData } from "@/components/view/buildViewData";

import { SessionPlay } from "@/views/sessions"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Session | Who Slow ",
}

type PageProps = {
  params: Promise<{
    sessionId: string,
  }>,
}

export const dynamic = 'force-static'

export default async function SessionPage(props: PageProps) {
  const params = await props.params;

  const {
    sessionId
  } = params

  const viewState = await buildViewData({games: true, campaigns: true, players: true, session: sessionId})

  return (
    <ViewContainer viewState={viewState} View={SessionPlay} />
  )
}