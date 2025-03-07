import React, {useState} from 'react'
import { Player, SessionEvent, SessionPlayer } from '@/state/types'
import { Button, Divider, Group, Text, Title } from '@mantine/core'

import './fixTurnForm.module.scss'

const WHEN = {
  ['Split current turn']: 0,
  ['1 min ago']: 1,
  ['2 mins ago']: 2,
  ['3 mins ago']: 3,
}

interface FixTurnFormProps {
  players: SessionPlayer[],
  nextPlayer: SessionPlayer["player"],
  onSubmit: (who: SessionPlayer["player"], howLong: number) => void,
  onCancel: () => void,
}

export function FixTurnForm({players, nextPlayer, onSubmit, onCancel}: FixTurnFormProps) {

  const [selectedPlayer, updateSelectedPlayer] = useState(nextPlayer)
  const [selectedWhen, updateSelectedWhen] = useState(0) // 0 = split the existing turn

  return (
    <div className="fix-turn">
      <Text>Use this form to fix a turn where you forgot to start the next players turn.</Text>
      <Title order={2} size="md" mt="md">Whose turn should have started?</Title>
      <Group>
        {players.map(player => (
            <Button
              key={player.player}
              variant={player.player == selectedPlayer ? 'filled' : 'outline'}
              onClick={() => updateSelectedPlayer(player.player)}>
                {player.name}
            </Button>
          ))}
      </Group>
      <Title order={2} size="md" mt="md">When should it have started?</Title>
      <Group>
        {(Object.keys(WHEN) as Array<keyof typeof WHEN>)
          .map(whenKey => {
          
            const whenValue = WHEN[whenKey]
        
            return (
              <Button 
                key={whenKey}
                variant={selectedWhen === whenValue ? 'filled' : 'outline'}
                onClick={() => updateSelectedWhen(whenValue)}>
                  {whenKey}
              </Button>
            )
          })
        }
      </Group>
      <Divider mt="md" />
      <Group className="fix-turn__controls" mt="md">
        <Button 
            variant="outline"
            onClick={onCancel}>
              Cancel
        </Button>
        <Button 
            variant={'filled'}
            onClick={() => onSubmit(selectedPlayer, selectedWhen)}>
              Submit
        </Button>
      </Group>
    </div>
  );
}