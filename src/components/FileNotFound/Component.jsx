import React from 'react';
import {Link} from 'react-router-dom'

import cn from 'classnames'

import './component.scss'

function Component(props) {
  return (
    <div>
      <h1>404 File Not Found</h1>
      <Link to="/">Home</Link>
    </div>
  );
}

export default Component;