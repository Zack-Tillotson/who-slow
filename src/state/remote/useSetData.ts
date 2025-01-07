'use client'

import { useCallback, useTransition } from "react"

import { library } from './index'

export function useSetData<T>(docPath: string, attrPath: string = '/') {
  const [isPending, startTransition] = useTransition()

  const set = useCallback(async (data: T) => {
    startTransition(async () => {
      await library().setAttribute(docPath, attrPath, data)
    })
  }, [docPath, attrPath, startTransition])

  return {isPending, set}
}
