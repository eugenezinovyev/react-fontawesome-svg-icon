import React from 'react';
import ReactDOM from 'react-dom';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Prism from 'prismjs';
import './index.css';
import App from './App';

Prism.manual = true;

ReactDOM.render(<App/>, document.getElementById('root'));
