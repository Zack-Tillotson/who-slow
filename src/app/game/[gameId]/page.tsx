import { ViewContainer } from "@/components/view";
import { buildViewData } from "@/components/view/buildViewData"

import { Game } from "@/views/games"
import {PLACEHOLDER_ID} from '@/navLinks'

type PageProps = {
  params: Promise<{
    gameId: string,
  }>,
}

export async function generateStaticParams() {
<<<<<<< HEAD
  return [{gameId: 'xxx'}] // XXX https://github.com/vercel/next.js/issues/61213
=======
  return [{gameId: PLACEHOLDER_ID}]
>>>>>>> csr-routing-and-data
}

export default async function GamePage(props: PageProps) {
  const params = await props.params;

  const {
    gameId
  } = params

  const viewState = await buildViewData({game: gameId})

  return (
    <ViewContainer viewState={viewState} View={Game} />
  )
}
