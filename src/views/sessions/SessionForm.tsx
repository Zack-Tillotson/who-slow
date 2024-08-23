'use client'

import { useDataState } from "@/state";
import { useForm, Controller } from "react-hook-form"

import { Button, ColorInput, Group, Select, Stack, Divider, Title } from "@mantine/core"
import { useSearchParams, useRouter } from "next/navigation";
import { Campaign, Game, Session, SessionPlayer } from "@/state/types";
import { useState } from "react";

type ViewProps = {
  sessionId?: string,
  campaign?: string,
}

type FormInputTypes = {
  campaign: Campaign["id"],
  game: Game["bggId"],
  sessionPlayers: SessionPlayer[],
}

export function SessionForm({sessionId}: ViewProps) {
  
  const router = useRouter()
  const params = useSearchParams()
  const {
    getSessionForm,
    saveSession,
    getCampaigns,
    getGames,
    getPlayers,
  } = useDataState()

  const campaign = params.get('campaignId') || '-1'
  const session = getSessionForm(sessionId, campaign)
  
  const campaigns = getCampaigns()
  const games = getGames()
  const players = getPlayers()

  const [playerCount, updatePlayerCount] = useState(2)

  const { handleSubmit, control, setValue, getValues, formState: {isValid} } = useForm<Session>({
    defaultValues: session,
  })
  const handleLocalSubmit = (data: Session) => {
    try {
      const fullSession = {
        ...data,
        id: session.id,
        date: session.date,
      }
      const result = saveSession(fullSession)
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
      setValue(`sessionPlayers.${moveIndex}.player`, getValues(`sessionPlayers.${moveIndex + 1}.player`))
    }
    updatePlayerCount(playerCount - 1)
  }

  return (
    <form onSubmit={handleSubmit(handleLocalSubmit)}>
      <Controller
        name="campaign"
        control={control}
        rules={{ required: true }}
        required
        render={({ field }) => (
          <Select 
            {...field}
            label="Campaign"
            data={campaigns.map(campaign => ({label: campaign.name, value: `${campaign.id}`}))}
          />
        )}
      />
      <Controller
        name="game"
        control={control}
        rules={{ required: true }}
        required
        render={({ field }) => (
          <Select 
            {...field}
            label="Game"
            data={games.map(game => ({label: game.name + '', value: `${game.bggId}`}))}
          />
        )}
      />
      <Divider mt="lg" mb="lg" />
      <Group gap="0" mb="lg">
        <Title order={2} size="xs" flex={1}>Players</Title>
        <Button onClick={handleAddPlayerClick}>+ Add</Button>
      </Group>
      {new Array(playerCount).fill('').map((player, index) => (
        <Stack key={index} mb="md">
          <Group>
            <Title order={3} size="xs" flex={1}>Player #{index + 1}</Title>
            <Button onClick={handleRemovePlayer(index)} mt="lg">× Remove</Button>
          </Group>
          <Controller
            name={`sessionPlayers.${index}.player`}
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select 
                {...field}
                flex={1}
                label={`Name`}
                value={`${field.value}`}
                data={players.map(player => ({
                  label: player.name,
                  value: `${player.id}`,
                }))}
              />
            )}
          />
          <Controller
              name={`sessionPlayers.${index}.color`}
              control={control}
              rules={{ required: true }}
              render={({ field }) => (<ColorInput {...field} label={`Color`} />)}
          />
        </Stack>
      ))}
      <Button type="submit" variant={isValid ? 'filled' : 'outline'}>Submit</Button>
    </form>
  )
}
