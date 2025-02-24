'use client'

import { library } from "@/state/remote"
import { Session } from "@/state/types"
import { useEffect, useState} from "react"
import { useRouter, useSearchParams } from 'next/navigation'
import { buildCsrRouteFromHref } from "@/components/view/buildRouteLink"

const getSessionIdFromShareCode = async (shareCode: string) => {
  const sessionId = await library().getSessionIdFromShareCode(shareCode)
  return sessionId || ''
}

async function handleSessionIdLookup(shareCode: string, onSessionId: (sessionId: Session["id"]) => void) {
  if(!shareCode) {
    return false
  }
  
  const sessionId = await getSessionIdFromShareCode(shareCode)

  if(!sessionId) {
    return false
  }

  onSessionId(sessionId)
  return true
}

export function useJoinSession() {

  const router = useRouter()
  const searchParams = useSearchParams()
  const paramCode = searchParams.get('code') || ''
  
  const [shareCode, updateShareCode] = useState(paramCode.toUpperCase())
  const [isDirty, updateIsDirty] = useState(false)
  const [isSubmitted, updateIsSubmitted] = useState(false)
  const [error, updateError] = useState('')

  const redirectOrError = async () => {
    if(shareCode.length !== 6) {
      updateError('Code must be six (6) characters long.')
      return
    }
    const result = await handleSessionIdLookup(
      shareCode, 
      (sessionId: Session["id"]) => router.push(buildCsrRouteFromHref(`/session/${sessionId}/play/`))
    )
    if(!result) {
      updateError('Share code is not correct')
    }
  }
  
  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const code = event.currentTarget.value
    updateIsDirty(true)
    updateShareCode(code)
  }

  const handleJoin = () => {
    updateIsSubmitted(true)
    redirectOrError()
  }

  const isError = isSubmitted && !!error

  useEffect(() => {
    if(shareCode) {
      // try joining if the code was included in the search param
      handleJoin()
    }
  }, [])
  
  return {
    shareCode,
    isError,
    error,
    handleCodeChange,
    handleJoin,
  }
}