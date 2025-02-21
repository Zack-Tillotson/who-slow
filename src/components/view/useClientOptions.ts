import { useSearchParams } from "next/navigation"
import { ViewDataOptions } from "./types"
import { useMemo } from "react"

export function useClientOptions(serverOptions: ViewDataOptions) {
  const searchParams = useSearchParams()
  const csrId = searchParams.get('id')

  const clientOptions = useMemo(() => Object.keys(serverOptions).reduce(
    (soFar, key) => ({...soFar, [key]: csrId || true}), {})
  , [serverOptions, csrId])
  
  return clientOptions  
}