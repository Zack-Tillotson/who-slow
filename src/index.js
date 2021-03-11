import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import App from './App';
import data from './data';

window.__data__ = data;

ReactDOM.render(<App />, document.getElementById('root'));