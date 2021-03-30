import React, {useState, useEffect} from 'react';

import cn from 'classnames'

import './component.scss'

const WHEN = {
  ['Split the current time']: 0,
  ['1 min']: 1,
  ['2 mins']: 2,
  ['3 mins']: 3,
}

function Component({players, lastPlayerEvent, onSubmit, onCancel}) {

  const [selectedPlayer, updateSelectedPlayer] = useState(null)
  const [selectedWhen, updateSelectedWhen] = useState(0) // 50% of the turn
  const [selectedIgnoreStat, updateSelectedIgnoreStat] = useState(true)

  return (
    <div className="fix-turn">
      <h1>Oops - fix the turn</h1>
      <p>Use this form to fix a turn where you forgot to start the next players turn.</p>
      <div className="fix-turn__player">
        <h2>Whose turn should have started?</h2>
        {players.map(player => (
            <button 
              key={player.id} 
              className={cn('player', '--button-like', {['--primary']: selectedPlayer === player.id, ['--hollow']: selectedPlayer !== player.id})}
              onClick={() => updateSelectedPlayer(player.id)}>
                {player.name}
            </button>
          ))}
      </div>
      <div className="fix-turn__when">
        <h2>Select when to have their turn start</h2>
        {Object.keys(WHEN)
          .filter(whenKey => Date.now() - WHEN[whenKey] * 1000 * 60 > lastPlayerEvent.when)
          .map(whenKey => {
          const whenValue = WHEN[whenKey]
        
          return (
            <button 
              key={whenKey}
              className={cn('when', '--button-like', {['--primary']: selectedWhen === whenValue, ['--hollow']: selectedWhen !== whenValue})}
              onClick={() => updateSelectedWhen(whenValue)}>
                {whenKey}
            </button>
          )
        })}
      </div>
      <div className="fix-turn__stat-ignore">
        <h2>Should these turns be ignored when calculating statistics?</h2>
        <button 
            className={cn('ignore-stat', '--button-like', {['--primary']: selectedIgnoreStat, ['--hollow']: !selectedIgnoreStat})}
            onClick={() => updateSelectedIgnoreStat(!selectedIgnoreStat)}>
              Ignore in stats
        </button>
      </div>
      <div className="fix-turn__controls">
        <button 
            className={cn('ignore-stat', '--button-like', '--hollow')}
            onClick={onCancel}>
              Cancel
        </button>
        <button 
            className={cn('ignore-stat', '--button-like', '--hollow', {['--disabled']: !selectedPlayer})}
            onClick={() => onSubmit(selectedPlayer, selectedWhen, selectedIgnoreStat)}>
              Submit
        </button>
      </div>
    </div>
  );
}

export default Component;