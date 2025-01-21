'use client'

import { library } from "@/state/remote"
import { Session } from "@/state/types"
import { useActionState} from "react"

const createShareCode = (sessionId: Session["id"]) => async (previousCode: string) => {
  try {
    const code = await library().getSessionShareCode(sessionId)
    return code
  } catch(e) {
    console.log('WARN', 'Unable to create share code', e)
    return previousCode
  }
}

function createShareLink(shareCode: string) {
  return shareCode
}

export function useShareSession(sessionId: Session["id"]) {
  const [shareCode, handleShareClick, isPending] = useActionState(createShareCode(sessionId), '')

  const shareLink = createShareLink(shareCode)
  
  const handleCodeClick = () => {
    navigator.clipboard.writeText(`${location.origin}/session/share/${shareLink}`)
  }

  return {
    isPending,
    shareLink,
    handleShareClick,
    handleCodeClick,
  }
}