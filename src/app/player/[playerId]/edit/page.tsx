import { ViewContainer } from "@/components/view";
import { buildViewData } from "@/components/view/buildViewData"

import { PlayerForm } from "@/views/players"

type PageProps = {
  params: Promise<{
    playerId: string,
  }>,
}

export const dynamic = 'force-static'

export default async function PlayerPage(props: PageProps) {
  const params = await props.params;

  const {
    playerId
  } = params;

  const viewState = await buildViewData({player: playerId})

  return (
    <ViewContainer viewState={viewState} View={PlayerForm} />
  )
}
