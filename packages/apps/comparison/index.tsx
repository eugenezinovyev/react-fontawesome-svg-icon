import React from 'react';
import ReactDOM from 'react-dom';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from 'react-fontawesome-icon';
import App, { RenderIconProps } from '../common/App';

const renderIcon = (props: RenderIconProps) => <FontAwesomeIcon {...props} />;

ReactDOM.render(<App renderIcon={renderIcon} />, document.getElementById('root'));
