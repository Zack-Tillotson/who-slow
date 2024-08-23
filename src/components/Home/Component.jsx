import React from 'react';

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
          <a
            href="https://whoslow-v2--who-slow.us-central1.hosted.app/"
            className="--button-like --primary --wide"
          >
            Open App
          </a>
        </div>
        <div className="home__explanation">
          <h1 className="subtitle">Seriously for fun</h1>
          <p>Play board games, keep track of sessions, and find out "Who Slow?!"</p>
        </div>
      </div>
    </Page>
  );
}

export default Component;