import React from 'react';
import {Link} from 'react-router-dom'

import cn from 'classnames'

import useData from 'data/useData';

import './component.scss'

function Component(props) {
  const session = useData(`session/${props.match.params.sessionId}`)

  return (
    <div>
      <h1>Who Slow</h1>
      <div className="session">
        <h2>Session</h2>
        {session.isLoading && '...'}
        {session.isLoaded && `Session ${session.value.id}`}        
      </div>
    </div>
  );
}

export default Component;