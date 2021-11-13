import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import App, { RenderIconProps } from '../common/App';

const renderIcon = (props: RenderIconProps) => <FontAwesomeIcon {...props} />;

ReactDOM.render(<App renderIcon={renderIcon} />, document.getElementById('root'));
