import React from 'react';
import {Link} from 'react-router-dom';

import cn from 'classnames'

import Page from 'components/Page'

import './component.scss'
import hero from 'assets/logo-400x400.png'

function Component(props) {
  return (
    <Page isHeadShown={false}>
      <div className="home">
        <div className="home__hero">
          <img src={hero} />
        </div>
        <div className="home__controls">
          <Link to="/app/" className="--button-like --primary --wide">Open App</Link>
        </div>
        <div className="home__explanation">
          <h1 className="subtitle">The board game turn tracker</h1>
          <p>Use this site to track how long your turns are when you're playing board games.</p>
        </div>
      </div>
    </Page>
  );
}

export default Component;