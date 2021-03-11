import React from 'react';
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

import cn from 'classnames'

import './component.scss'

function Component(props) {
  // `session/${props.match.params.sessionId}`
  const session = useSelector().session

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