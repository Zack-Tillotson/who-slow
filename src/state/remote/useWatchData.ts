'use client'

import { useCallback, useEffect, useState } from "react"

import { Session } from '../types'
import { library } from './index'
import { buildSession } from './objects/session'

function useWatchData<T>(path: string, objectBuilder: () => T) {
  const [isInitialized, updateIsInitialized] = useState(false)
  const [data, updateData] = useState<T|null>(null)

  const dataEventCallback = useCallback(async (data: T) => {
    updateIsInitialized(true)
    updateData(data as T)
  }, [])

  useEffect(() => {
    let unsubscribe = () => {}
    (async () => {
      await library().ensureAuth()
      unsubscribe = library().watchData<T>(path, objectBuilder, dataEventCallback)
    })()
    return unsubscribe
  }, [path, objectBuilder, dataEventCallback])

  return {isInitialized, data}
}

export function useWatchSession(sessionId: Session["id"]) {
  return useWatchData<Session>(`sessions/${sessionId}`, buildSession)
}