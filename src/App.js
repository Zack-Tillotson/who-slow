import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import {Provider} from 'react-redux'

import Home from 'components/Home';
import AppHome from 'components/AppHome';
import Session from 'components/Session';
import SessionStats from 'components/SessionStats';
import FileNotFound from 'components/FileNotFound';

function App({store}) {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/app/session/:sessionId/stats/" component={SessionStats} exact />
          <Route path="/app/session/:sessionId/" component={Session} exact />
          <Route path="/app/" exact component={AppHome} />
          <Route path="/" exact component={Home} />
          <Route component={FileNotFound} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

