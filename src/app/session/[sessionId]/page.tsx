import { Metadata } from "next";

import { Session } from "@/views/sessions"
import { buildViewData } from "@/components/view/buildViewData";
import { ViewContainer } from "@/components/view";
import { PLACEHOLDER_ID } from "@/navLinks";

type PageProps = {
  params: Promise<{
    sessionId: string,
  }>,
}

export const metadata: Metadata = {
  title: "Setup session | Who Slow ",
}


export async function generateStaticParams() {
  return [{sessionId: PLACEHOLDER_ID}]
}

export default async function SessionPage(props: PageProps) {
  const params = await props.params;

  const {
    sessionId
  } = params;

  const viewState = await buildViewData({session: sessionId})

  return (
    <ViewContainer viewState={viewState} View={Session} />
  )
}
