import { ViewContainer } from "@/components/view";
import { buildViewData } from "@/components/view/buildViewData"
import { PLACEHOLDER_ID } from "@/navLinks";

import { GameForm } from "@/views/games"

type PageProps = {
  params: Promise<{
    gameId: string,
  }>,
}

export async function generateStaticParams() {
  return [{gameId: PLACEHOLDER_ID}]
}

export default async function GamePage(props: PageProps) {
  const params = await props.params;

  const {
    gameId
  } = params;

  const viewState = await buildViewData({game: gameId})

  return (
    <ViewContainer viewState={viewState} View={GameForm} />
  )
}
