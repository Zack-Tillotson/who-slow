'use client'

import { useState, useEffect, useDebugValue } from "react";
import bggNameSearch from './bggNameSearch'
import bggGameAttrs, { BGG_GAME } from "./bggSafeAttrs";
import { Game } from "@/state/types";

interface BggGame {
  name: string,
  yearPublished: number,
  bggId: number,
}

export const STATES = {
  PRE: 'PRE',
  DEBOUNCE: 'DEBOUNCE',
  FETCH: 'FETCH',
  RESULTS: 'RESULTS',
  ATTR: 'ATTR',
}

const DEBOUNCE_TIME = 1000

// eslint-disable-next-line @typescript-eslint/no-empty-function
const cancel = {fn: () => {}}

export function useGameSearch(attrsCallback: (game: BGG_GAME) => void) {
  
  const [queryState, updateQueryState] = useState(STATES.PRE)
  const [queryTerm, updateQueryTerm] = useState('')
  const [gamesList, updateGamesList] = useState<BggGame[]>([])

  useEffect(() => {
    if(!queryTerm) {
      updateQueryState(STATES.PRE)
    }

    cancel.fn()

    new Promise((resolve, reject) => {
        updateQueryState(STATES.DEBOUNCE)

        setTimeout(resolve, DEBOUNCE_TIME)
        cancel.fn = reject
      })
      .then(() => {
        updateQueryState(STATES.FETCH)
        return bggNameSearch(queryTerm)
      })
      .then(results => {
        if(!results) return
        updateQueryState(STATES.RESULTS)
        updateGamesList(results)
      })
      .catch(e => {
        console.log(e)
      })

  }, [queryTerm])

  const handleQueryChange = (value: string) => {
    updateQueryTerm(value)
  }
  
  const handleItemSelection = (bggId: string) => {
    updateQueryState(STATES.ATTR)
    try {
      bggGameAttrs(bggId).then(attrsCallback)
    } catch(e) {
      console.log(e)
    }
    updateQueryState(STATES.PRE)
  }

  useDebugValue(`${queryTerm}=>${queryState}, ${gamesList.length} games`)

  return {
    queryState,
    queryTerm,
    isLoading: queryState === STATES.FETCH,
    gamesList,
    handleQueryChange,
    handleItemSelection,
  }
}