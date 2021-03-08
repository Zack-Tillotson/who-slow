import React from 'react';
import {Link} from 'react-router-dom';

import cn from 'classnames'

import './component.scss'

function Component(props) {
  return (
    <div>
      <h1>Who Slow</h1>
      <div className="subtitle">the board game turn tracker</div>
      <div className="app-links">
        <Link to="/app/">Open application</Link>
      </div>
    </div>
  );
}

export default Component;