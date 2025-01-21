'use client'

import { Session } from "@/state/types"
import { useActionState} from "react"

const createShareCode = (sessionId: Session["id"]) => async (previousCode: string) => {
  return sessionId
}

function createShareLink(shareCode: string) {
  return `/session/share/${shareCode}/`
}

export function useShareSession(sessionId: Session["id"]) {
  const [shareCode, handleShareClick, isPending] = useActionState(createShareCode(sessionId), '')

  const shareLink = createShareLink(shareCode)

  return {
    isPending,
    shareLink,
    handleShareClick,
  }
}