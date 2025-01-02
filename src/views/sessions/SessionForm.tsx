'use client'

import { useDataState } from "@/state";
import { useForm, Controller } from "react-hook-form"

import { Button, ColorInput, Group, Select, Stack, Divider, Title, Autocomplete } from "@mantine/core"
import { useSearchParams, useRouter } from "next/navigation";
import { Campaign, Game, Player, SessionForm as SessionFormType } from "@/state/types";
import { useState } from "react";
import { IconChevronCompactDown, IconChevronCompactUp, IconPlus, IconX } from "@tabler/icons-react";
import { BGG_GAME } from "../games/bggSafeAttrs";
import { GameAutocomplete } from "../games/GameAutocomplete";
import { library } from "@/state/remote";

type ViewProps = {
  sessionId?: string,
  campaign?: string,
  games: Game[],
  players: Player[],
  campaigns: Campaign[],
}

export function SessionForm({sessionId, games, players, campaigns}: ViewProps) {  
  const router = useRouter()
  const params = useSearchParams()
  const {
    getSessionForm,
  } = useDataState()

  const campaign = params.get('campaignId') || ''
  const session = getSessionForm(sessionId, campaign)
  
  const [playerCount, updatePlayerCount] = useState(session.players.length || 2)

  const [gameName, updateGameName] = useState(games.find(({id}) => id === session.game)?.name ?? '')

  const { handleSubmit, control, setValue, getValues, formState: {isValid} } = useForm<SessionFormType>({
    defaultValues: session,
  })
  const handleLocalSubmit = async (data: SessionFormType) => {
    try {
      const {id, players: formPlayers, campaign, game} = data
      const builtSession = {
        id,
        campaign,
        game,
        sessionPlayers: formPlayers.slice(0, playerCount).map(player => {
          const id = players.find(({name}) => name === player.player)?.id ?? ''
          return {...player, player: id}
        }),
      }
      const result = await library().saveSessionConfig(builtSession)
      router.push(`/session/${result.id}/`)
    } catch(e) {
      console.log(e)
      return
    }
  }

  const handleAddPlayerClick = () => {
    updatePlayerCount(playerCount + 1)
  }

  const handleRemovePlayer = (playerIndex: number) => () => {
    for(let moveIndex = playerIndex ; moveIndex < playerCount - 1 ; moveIndex++) {
      setValue(`players.${moveIndex}.player`, getValues(`players.${moveIndex + 1}.player`))
      setValue(`players.${moveIndex}.color`, getValues(`players.${moveIndex + 1}.color`))
    }
    updatePlayerCount(playerCount - 1)
  }

  const getPlayerValues = (playerIndex: number) => {
    return {
      player: getValues(`players.${playerIndex}.player`),
      color: getValues(`players.${playerIndex}.color`),
    }
  }

  const setPlayerValues = (playerIndex: number, {player, color}: {player: string, color: string}) => {
    setValue(`players.${playerIndex}.player`, player)
    setValue(`players.${playerIndex}.color`, color)
  }

  const handleSwapPlayers = (aIndex: number, bIndex: number) => () => {
    const aValues = getPlayerValues(aIndex)
    const bValues = getPlayerValues(bIndex)
    setPlayerValues(bIndex, aValues)
    setPlayerValues(aIndex, bValues)
  }

  const handleGameSelect = async (bggGame: BGG_GAME) => {
    const {bggId, ...gameAttrs} = bggGame
    const game = await library().saveGame({id: `${bggId}`, ...gameAttrs})
    setValue('game', game.id)
    updateGameName(game.name)
  }

  return (
    <form onSubmit={handleSubmit(handleLocalSubmit)}>
      <Controller
        name="campaign"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Select 
            {...field}
            label="Campaign"
            data-testid="select-campaign"
            required
            value={`${field.value}`}
            data={campaigns.map(campaign => ({label: campaign.name, value: campaign.id}))}
          />
        )}
      />
      <Group>
        <div>
          Game selected: {getValues('game')} - {gameName}
        </div>
        <GameAutocomplete label="Game" onSelect={handleGameSelect} defaultGame={gameName} />
      </Group>
      <Divider mt="lg" mb="lg" />
      <Group gap="0" mb="lg">
        <Title order={2} size="xs" flex={1}>{playerCount} Players</Title>
        <Button
          onClick={handleAddPlayerClick}
          leftSection={<IconPlus size="1rem" stroke={1.5} />}
        >
          Player count
        </Button>
      </Group>
      {new Array(playerCount).fill('').map((player, index) => (
        <Stack key={index} mb="lg" gap="0">
          <Title
            order={3}
            size="xs"
            flex={1}
            bg="#eee"
            pt="sm"
            pb="sm"
            pl="sm"
          >
            Player #{index + 1}
          </Title>
          <Group pl="sm">
            <Controller
              name={`players.${index}.player`}
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Autocomplete 
                  {...field}
                  flex={1}
                  label={`Name`}
                  data-testid={`select-player${index+1}`}
                  data={players.map(player => player.name)}
                />
              )}
            />
            <Controller
                name={`players.${index}.color`}
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <ColorInput {...field} label={`Color`} data-testid={`input-color${index+1}`} />
                )}
            />
          </Group>
          <Group mt="xs" pl="sm">
            <Button
              variant="outline"
              onClick={handleSwapPlayers(index, index + 1)}
              disabled={index + 1 === playerCount}
              pl="xs"
              pr="xs"
              size="xs"
              aria-label="Move up in the list"
            >
              <IconChevronCompactDown />
            </Button>
            <Button
              variant="outline"
              onClick={handleSwapPlayers(index - 1, index)}
              disabled={index === 0}
              pl="xs"
              pr="xs"
              size="xs"
              aria-label="Move down in the list"
            >
              <IconChevronCompactUp />
            </Button>
            <Button
              variant="outline"
              onClick={handleRemovePlayer(index)}
              pl="xs"
              pr="xs"
              size="xs"
              aria-label="Remove player"
            >
              <IconX />
            </Button>
          </Group>
        </Stack>
      ))}
      <Button type="submit" variant={isValid ? 'filled' : 'outline'}>Submit</Button>
    </form>
  )
}
