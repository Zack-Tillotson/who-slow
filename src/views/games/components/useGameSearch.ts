'use client'

import { useState, useEffect, useDebugValue } from "react";
import bggNameSearch from './bggNameSearch'
import bggGameAttrs, { BGG_GAME } from "./bggSafeAttrs";

export const STATES = {
  PRE: 'PRE',
  DEBOUNCE: 'DEBOUNCE',
  FETCH: 'FETCH',
  RESULTS: 'RESULTS',
  ATTR: 'ATTR',
}

const DEBOUNCE_TIME = 1000

const cancel = {fn: () => {}}

export function useGameSearch(attrsCallback: (game: BGG_GAME) => void, initialQuery: string) {
  
  const [queryState, updateQueryState] = useState(STATES.PRE)
  const [queryTerm, updateQueryTerm] = useState(initialQuery ?? '')
  const [gamesList, updateGamesList] = useState<Partial<BGG_GAME>[]>([])

  useEffect(() => {
    updateQueryTerm(initialQuery)
  }, [initialQuery])

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
        console.log('ERROR', 'useGameSearch', e)
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
      console.log('ERROR', 'useGameSearch', e)
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