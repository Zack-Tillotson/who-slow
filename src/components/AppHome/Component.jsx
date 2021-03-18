import React from 'react';
import {Link} from 'react-router-dom'

import {useState, dispatchAction, actions} from 'state'
import {useDispatch} from 'react-redux'
import cn from 'classnames'

import Page from 'components/Page'

import './component.scss'
import logo from 'assets/turtle-400x400.png'

function Component(props) {

  const sessionConfig = useState('sessionConfig');
  const {status, players, games, sessions} = sessionConfig;
  const dispatch = useDispatch()
  
  if(!status.isInitialized) {
    return (
      <div className="page__loader">
        <img src={logo} />
      </div>
    )    
  }

  const handleClickNewSessionClick = event => {
    dispatch(actions.uiRequestNewSession())
  }

  return (
    <Page className="app-home">
      <h1 className="app-home__title">Who Slow</h1>
      <div className="app-home__controls">
        <button className="--button-like --primary --wide" onClick={handleClickNewSessionClick}>
          New Session
        </button>
      </div>
    </Page>
  );
}

export default Component;