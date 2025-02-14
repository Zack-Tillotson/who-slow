import { Metadata } from "next";

import { Session } from "@/views/sessions"
import { buildViewData } from "@/components/view/buildViewData";
import { ViewContainer } from "@/components/view";

type PageProps = {
  params: Promise<{
    sessionId: string,
  }>,
}

export const metadata: Metadata = {
  title: "Setup session | Who Slow ",
}

export async function generateStaticParams() {
  return [{sessionId: 'xxx'}] // XXX https://github.com/vercel/next.js/issues/61213
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
