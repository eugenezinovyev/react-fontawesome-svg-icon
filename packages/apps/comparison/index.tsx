import React from 'react';
import ReactDOM from 'react-dom';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from 'react-fontawesome-icon';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

ReactDOM.render(<FontAwesomeIcon icon={faCoffee} />, document.getElementById('root'));
