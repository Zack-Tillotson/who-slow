import React from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom'

import Home from 'components/Home'
import FileNotFound from 'components/FileNotFound'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route component={FileNotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App

