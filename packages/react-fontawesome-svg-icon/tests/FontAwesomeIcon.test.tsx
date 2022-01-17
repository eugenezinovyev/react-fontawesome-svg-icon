import React from 'react';
import '@testing-library/jest-dom';
import { FontAwesomeSvgIcon } from '../src';
import commonTests from './FontAwesomeIcon.common';

describe('<FontAwesomeSvgIcon />', () => {
    commonTests('<FontAwesomeSvgIcon />', props => <FontAwesomeSvgIcon { ...props }/>);
});