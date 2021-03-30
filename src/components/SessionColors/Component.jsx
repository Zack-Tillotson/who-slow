import React, {useEffect} from 'react';
import {Link} from 'react-router-dom'
import cn from 'classnames'
import {useDispatch} from 'react-redux'

import {actions} from 'state'
import useState from 'state/useState'

import Page from 'components/Page'
import {COLORS} from 'state/reducers/session'

import './component.scss'
import logo from 'assets/logo-400x400.png'

function Component(props) {
  const dispatch = useDispatch()

  const [sessionConfig] = useState('sessionConfig')
  const [session] = useState('session');
  const [colors, updateColors] = useState('session/colors');
  
  const {sessionId} = props.match.params
  
  useEffect(() => {
    dispatch(actions.uiRequestLoadSession({sessionId}))
  }, [sessionId])

  if(!session.status.isInitialized || !sessionConfig.status.isInitialized) {
    return (
      <div className="page__loader">
        <img src={logo} />
      </div>
    )    
  }
  const players = session.players.map(playerId => sessionConfig.players.find(player => player.id === playerId)).filter(Boolean)

  const handleColorClick = (color, who) => event => {
    const newColors = [...colors]
    newColors[who] = color
    updateColors(newColors)
  }

  return (
    <Page className="session-colors">
      <div className="session-colors__breadcrumbs">
        <Link to=".." className="--button-like --minimal">Go back</Link>
      </div>
      <h1 className="session-colors__title">
        Select Player Colors
      </h1>
      <div className="session-colors__players">
        {players.map((player, index) => (
          <div className="session-colors__player color-player" key={player.id}>
            <h2 className="color-player__title">{player.name}</h2>
            <div className="color-player__colors">
              {COLORS.map(color => (
                <button 
                  key={color} 
                  className="--button-like --primary" 
                  style={{backgroundColor: color, borderColor: colors[index] === color ? '#000' : ''}}
                  onClick={handleColorClick(color, index)}>
                  {' '}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Link to=".." className="--button-like --primary">Submit</Link>
    </Page>
  );
}

export default Component;