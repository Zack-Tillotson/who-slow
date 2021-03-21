import React, {useState as useReactState} from 'react';
import {Link, useHistory} from 'react-router-dom'

import {useState, dispatchAction, actions} from 'state'
import {useDispatch} from 'react-redux'
import cn from 'classnames'

import Page from 'components/Page'

import './component.scss'
import logo from 'assets/logo-400x400.png'

function Component(props) {

  const [sessionConfig] = useState('sessionConfig');
  const [games, updateGames] = useState('sessionConfig/games');
  const [form, updateForm] = useState('sessionConfig/newSessionForm');
  const [inputValue, updateInputValue] = useReactState('')
  const history = useHistory();

  const dispatch = useDispatch()

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

  const handleNewGameClick = event => {
    updateGames([...games, {name: inputValue}])
  }

  const handleSelectGameClick = game => event => {
    updateForm({...form, game})
    history.push('/app/')
  }

  return (
    <Page className="app-games">
      <div className="app-games__breadcrumbs">
        <Link to="/app/" className="--button-like --minimal">Go back</Link>
      </div>
      <div className="app-games__intro">
        Select a game from the list below or add a new game to the list.
      </div>
      <table className="app-games__table">
        <thead>
          <tr>
            <th>Game</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {games.map(game => (
            <tr key={game.id}>
              <td>{game.name}</td>
              <td><button className="--button-like --primary" onClick={handleSelectGameClick(game.id)}>Select</button></td>
            </tr>
          ))}
          <tr>
            <td><input type="text" value={inputValue} onChange={handleInputChange} /></td>
            <td><button className="--button-like --primary" onClick={handleNewGameClick}>+</button></td>
          </tr>
        </tbody>
      </table>
    </Page>
  );
}

export default Component;