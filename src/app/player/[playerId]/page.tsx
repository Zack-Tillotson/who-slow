import { ViewContainer } from "@/components/view";
import { buildViewData } from "@/components/view/buildViewData"

import { Player } from "@/views/players"

type PageProps = {
  params: Promise<{
    playerId: string,
  }>,
}

export async function generateStaticParams() {
  return [{playerId: 'xxx'}] // XXX https://github.com/vercel/next.js/issues/61213
}

export default async function PlayerPage(props: PageProps) {
  const params = await props.params;

  const {
    playerId
  } = params;

  const viewState = await buildViewData({player: playerId})

  return (
    <ViewContainer viewState={viewState} View={Player} />
  )
}
