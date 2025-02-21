'use client'

import { library } from "@/state/remote"
import { Session } from "@/state/types"
import { useActionState, useState} from "react"

const createShareCode = (sessionId: Session["id"], onSuccess: () => void) => async (previousCode: string) => {
  try {
    const code = await library().getSessionShareCode(sessionId)
    const shareLink = createShareLink(code)
    navigator.clipboard.writeText(shareLink)
    onSuccess()
    return code
  } catch(e) {
    console.log('WARN', 'Unable to create share code', e)
    return previousCode
  }
}

function createShareLink(shareCode: string) {
  return `${location.origin}/session/share/?code=${shareCode}`
}

export function useShareSession(sessionId: Session["id"]) {
  const [isNotificationVisible, updateIsNotificationVisible] = useState(false)
  const [shareCode, handleShareClick, isPending] = useActionState(
    createShareCode(sessionId, () => updateIsNotificationVisible(true))
  , '')
  
  const handleCodeClick = () => {
    const shareLink = createShareLink(shareCode)
    navigator.clipboard.writeText(shareLink)
    updateIsNotificationVisible(true)
  }

  const handleNotificationClose = () => {
    updateIsNotificationVisible(false)
  }

  return {
    isPending,
    isNotificationVisible,
    shareCode,
    handleShareClick,
    handleCodeClick,
    handleNotificationClose,
  }
}