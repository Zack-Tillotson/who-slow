import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";

import Home from 'components/Home';
import AppHome from 'components/AppHome';
import Session from 'components/Session';
import FileNotFound from 'components/FileNotFound';

function App({store}) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/app/session/:sessionId" component={Session} />
        <Route path="/app/" exact component={AppHome} />
        <Route path="/" exact component={Home} />
        <Route component={FileNotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

