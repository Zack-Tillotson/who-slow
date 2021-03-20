import React, {useState as useReactState} from 'react';
import {Link, useHistory} from 'react-router-dom'
import {COLORS} from 'state/indexdb/data/players'

import {useState, dispatchAction, actions} from 'state'
import {useDispatch} from 'react-redux'
import cn from 'classnames'

import Page from 'components/Page'

import './component.scss'
import logo from 'assets/turtle-400x400.png'

function Component(props) {

  const [sessionConfig] = useState('sessionConfig');
  const [players, updatePlayers] = useState('sessionConfig/players');
  const [form, updateForm] = useState('sessionConfig/newSessionForm');
  const [inputValue, updateInputValue] = useReactState('')
  const history = useHistory();

  if(!sessionConfig.status.isInitialized) {
    return (
      <div className="page__loader">
        <img src={logo} />
      </div>
    )    
  }

  const handleInputChange = event => {
    updateInputValue(event.target.value)
  }

  const handleNewPlayerClick = event => {
    updatePlayers([...players, {name: inputValue, color: COLORS[players.length]}])
  }

  const handleTogglePlayer = player => event => {
    const indexOfPlayer = form.players.indexOf(player)
    const newPlayers = (indexOfPlayer >= 0) ? form.players.filter(p => p !== player) : [...form.players, player]
    updateForm({...form, players: newPlayers})
  }

  return (
    <Page className="app-players">
      <div className="app-players__breadcrumbs">
        <Link to="/app/" className="--button-like --minimal">Go back</Link>
      </div>
      <div className="app-players__intro">
        Toggle the players from the list below or add new players as needed to the list.
      </div>
      <table className="app-players__table">
        <thead>
          <tr>
            <th>Player</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {players.map(player => (
            <tr key={player.id} onClick={handleTogglePlayer(player.id)}>
              <td colspan="2" style={{background: form.players.indexOf(player.id) >= 0 ? player.color : ''}}>{player.name}</td>
            </tr>
          ))}
          <tr>
            <td colspan="2"><Link to="/app/" className="--button-like --primary --wide">Done</Link></td>
          </tr>
          <tr>
            <td><input type="text" value={inputValue} onChange={handleInputChange} /></td>
            <td><button className="--button-like --primary" onClick={handleNewPlayerClick}>+</button></td>
          </tr>
        </tbody>
      </table>
    </Page>
  );
}

export default Component;