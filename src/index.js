import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import App from './App';
import data from './data';
import hardcodedSource from './data/sources/hardcoded'

data.initialize([hardcodedSource]);
window.__data__ = data;

ReactDOM.render(<App />, document.getElementById('root'));