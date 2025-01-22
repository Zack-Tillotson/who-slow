'use client'

import { library } from "@/state/remote"
import { Session } from "@/state/types"
import { useActionState, useState} from "react"

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

export function useJoinSession(initialCode?: string) {

  const [shareCode, updateShareCode] = useState(initialCode?.toUpperCase() || '')
  
  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const code = event.currentTarget.value
    updateShareCode(code)
  }

  const handleJoin = () => {
    if(shareCode.length === 6) {
      window.location.href = `/session/share/${shareCode.toUpperCase()}/`
    }
  }
  
  return {
    shareCode,
    handleCodeChange,
    handleJoin,
  }
}