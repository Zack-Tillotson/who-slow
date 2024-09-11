'use client'

import { useDataState } from "@/state";
import { useForm, Controller } from "react-hook-form"

import { Button, ColorInput, Group, Select, Stack, Divider, Title, Autocomplete } from "@mantine/core"
import { useSearchParams, useRouter } from "next/navigation";
import { SessionForm as SessionFormType } from "@/state/types";
import { useState } from "react";
import { IconChevronCompactDown, IconChevronCompactUp, IconPlus, IconX } from "@tabler/icons-react";

type ViewProps = {
  sessionId?: string,
  campaign?: string,
}

export function SessionForm({sessionId}: ViewProps) {
  
  const router = useRouter()
  const params = useSearchParams()
  const {
    getSessionForm,
    saveSessionForm,
    getCampaigns,
    getGames,
    getPlayers,
  } = useDataState()

  const campaign = params.get('campaignId') || '-1'
  const session = getSessionForm(sessionId, campaign)
  
  const campaigns = getCampaigns()
  const games = getGames()
  const players = getPlayers()

  const [playerCount, updatePlayerCount] = useState(session.players.length || 2)

  const { handleSubmit, control, setValue, getValues, formState: {isValid} } = useForm<SessionFormType>({
    defaultValues: session,
  })
  const handleLocalSubmit = (data: SessionFormType) => {
    try {
      const result = saveSessionForm({
        ...data,
        players: data.players.slice(0, playerCount),
      })
      router.push(`/session/${result.id}/`)
    } catch(e) {
      console.log(e)
      return
    }
  }

  const handleAddPlayerClick = () => {
    updatePlayerCount(playerCount+1)
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
            data={campaigns.map(campaign => ({label: campaign.name, value: `${campaign.id}`}))}
          />
        )}
      />
      <Controller
        name="game"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Select 
            {...field}
            label="Game"
            data-testid="select-game"
            required
            value={`${field.value}`}
            data={games.map(game => ({label: game.name + '', value: `${game.bggId}`}))}
          />
        )}
      />
      <Divider mt="lg" mb="lg" />
      <Group gap="0" mb="lg">
        <Title order={2} size="xs" flex={1}>{playerCount} Players</Title>
        <Button
          onClick={handleAddPlayerClick}
          leftSection={<IconPlus size="1rem" stroke={1.5} />}
        >
          Add player
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
