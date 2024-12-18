'use client'

import { Campaign } from '../types'
import {library} from './index'
import { useEffect, useState } from "react"

export function useRemoteData() {
  const [data, updateData] = useState<{campaigns: Campaign[]}|null>(null)

  useEffect(() => {
    (async () => {
      const campaigns = await library.getCampaigns()
      updateData({campaigns})
    })()
  }, [])

  return {data}

}