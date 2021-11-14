import React from 'react';
import ReactDOM from 'react-dom';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

ReactDOM.render(<FontAwesomeSvgIcon icon={faCoffee} />, document.getElementById('root'));
