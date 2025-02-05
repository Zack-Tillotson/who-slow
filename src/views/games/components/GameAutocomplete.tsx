'use client'

import { Autocomplete, defaultVariantColorsResolver } from "@mantine/core"
import { STATES, useGameSearch } from "./useGameSearch";
import { BGG_GAME } from "./bggSafeAttrs";
import { useDisclosure } from "@mantine/hooks";
import { useRef } from "react";

interface GameAutocompleteProps {
  label?: string,
  defaultGame?: string,
  onSelect: (game: BGG_GAME) => void
}

export function GameAutocomplete({
  label = 'Lookup on Board Game Geek',
  defaultGame = '',
  onSelect,
}: GameAutocompleteProps) {
  const [dropdownOpened, { toggle }] = useDisclosure();
  const ref = useRef<HTMLInputElement>(null);

  const {
    queryTerm,
    queryState,
    gamesList,
    handleQueryChange,
    handleItemSelection,
  } = useGameSearch(onSelect, defaultGame)

  const handleSelection = (bggId: string) => {
    handleItemSelection(bggId)
    toggle()
  }

  const handleChange = (value: string) => {
    handleQueryChange(value)
    if(dropdownOpened !== !!value) {
      toggle()
    }
  }

  const handleFocus = () => {
    ref.current?.select()
  }

  return (
    <Autocomplete
      ref={ref}
      label={label}
      data={gamesList.map(game => ({
        label: `${game.name} (${game.yearPublished})`, 
        value: `${game.bggId}`,
      }))}
      limit={10}
      value={queryTerm}
      disabled={queryState === STATES.ATTR}
      dropdownOpened={dropdownOpened}
      onChange={handleChange}
      onFocus={handleFocus}
      comboboxProps={{onOptionSubmit: handleSelection}}
    />
  )
}
