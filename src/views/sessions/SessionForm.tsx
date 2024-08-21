'use client'

import { useDataState } from "@/state";
import { useForm, Controller } from "react-hook-form"

import { Button, ColorInput, Group, Select, Stack, Text, TextInput, Title } from "@mantine/core"
import { useSearchParams, useRouter } from "next/navigation";
import { Campaign, Game, Session, SessionPlayer } from "@/state/types";
import { useState } from "react";

type ViewProps = {
  sessionId?: string,
  campaign?: string,
}

type FormInputTypes = {
  status: 'PRE'|'IN'|'PAUSE'|'POST',
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

  const campaign = params.get('campaign') || '-1'
  const session = getSessionForm(sessionId, campaign)
  
  const campaigns = getCampaigns()
  const games = getGames()
  const players = getPlayers()

  const [playerCount, updatePlayerCount] = useState(1)

  const { handleSubmit, control, setValue, getValues } = useForm<Session>({
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
      router.push(`/app/session/${result.id}/`)
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
        render={({ field }) => (
          <Select 
            {...field}
            label="Campaign"
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
            value={`${field.value}`}
            data={games.map(game => ({label: game.name + '', value: `${game.bggId}`}))}
          />
        )}
      />
      {new Array(playerCount).fill('').map((player, index) => (
        <Stack key={index} mb="md">
          <Group>
            <Controller
              name={`sessionPlayers.${index}.player`}
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select 
                  {...field}
                  label={`Player ${index + 1}`}
                  value={`${field.value}`}
                  data={players.map(player => ({label: player.name, value: `${player.id}`}))}
                />
              )}
            />
            <Button onClick={handleRemovePlayer(index)} mt="lg">×</Button>
          </Group>
          <Controller
              name={`sessionPlayers.${index}.color`}
              control={control}
              rules={{ required: true }}
              render={({ field }) => (<ColorInput {...field} label={`Player ${index + 1} color`} />)}
          />
        </Stack>
      ))}
      <Stack component={'dl'} gap="0" mb="lg">
        <Button onClick={handleAddPlayerClick}>Add player</Button>
      </Stack>
      <Button type="submit">Submit</Button>
    </form>
  )
}
