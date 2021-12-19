import React from 'react';
import { FontAwesomeIcon as FortAwesomeReactFontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FontAwesomeSvgIcon as ReactFontAwesomeIcon } from 'react-fontawesome-svg-icon';
import { faCalendar as faCalendarSolid, faCoffee, faHeart, faSnowboarding } from '@fortawesome/free-solid-svg-icons';
import { faCalendar as faCalendarRegular } from '@fortawesome/free-regular-svg-icons';
import ExampleCollection from './ExampleCollection';
import ListItemExample from './ListItemExample';
import classes from './App.module.css';

const examples = [
    [ 'Solid & Regular', [ { icon: faCalendarSolid, size: 'lg' }, { icon: faCalendarRegular, size: 'lg' } ] ],
    [ 'Sizes', [
        { icon: faCoffee, size: 'xs' },
        { icon: faCoffee, size: 'sm' },
        { icon: faCoffee, size: 'lg' },
        { icon: faCoffee, size: '1x' },
        { icon: faCoffee, size: '2x' },
        { icon: faCoffee, size: '3x' },
        { icon: faCoffee, size: '4x' },
        { icon: faCoffee, size: '5x' },
        { icon: faCoffee, size: '6x' },
        { icon: faCoffee, size: '7x' },
        { icon: faCoffee, size: '8x' },
        { icon: faCoffee, size: '9x' },
        { icon: faCoffee, size: '10x' },
    ] ],
    [ 'Title (hint)', [ { icon: faCoffee, size: 'lg', title: 'Icon title' } ] ],
    [ 'Custom Style and Color', [
        { icon: faCoffee, size: 'lg', style: { backgroundColor: '#2e7dd1', color: '#ffffff', padding: '0.5rem' } },
        { icon: faCoffee, size: 'lg', color: '#2e7dd1' },
    ] ],
    [ 'Border, Fixed Width, Flip, Spin & Pulse', [
        { icon: faCoffee, size: 'lg', border: true },
        { icon: faCoffee, size: 'lg', fixedWidth: true },
        { icon: faCoffee, size: 'lg', flip: 'horizontal' },
        { icon: faCoffee, size: 'lg', flip: 'vertical' },
        { icon: faCoffee, size: 'lg', flip: 'both' },
        { icon: faCoffee, size: 'lg', spin: true },
        { icon: faCoffee, size: 'lg', pulse: true },
    ] ],
    [ 'Inverse', classes.exampleInverse, [ { icon: faCoffee, size: 'lg', inverse: true } ] ],
    [ ListItemExample ],
    [ 'Pull', [ { icon: faCoffee, size: 'lg', pull: 'left' }, { icon: faCoffee, size: 'lg', pull: 'right' } ] ],
    [ 'Tab Index', [ { icon: faCoffee, size: 'lg', tabIndex: 1 }, { icon: faHeart, size: 'lg', tabIndex: 2 } ] ],
    [ 'Swap Opacity', [ { icon: faCoffee, size: 'lg', swapOpacity: true } ] ],
    [ 'Rotation', [
        { icon: faSnowboarding, size: '2x' },
        { icon: faSnowboarding, size: '2x', rotation: 90 },
        { icon: faSnowboarding, size: '2x', rotation: 180 },
        { icon: faSnowboarding, size: '2x', rotation: 270 },
    ] ],
];

const App = () => (
    <div className={classes.root}>
        <header className={classes.header}>
            <h1>Features</h1>
        </header>
        <div className={classes.exampleCollections}>
            <ExampleCollection title="@fortawesome/react-fontawesome" component={FortAwesomeReactFontAwesomeIcon} examples={examples}/>
            <ExampleCollection title="react-fontawesome-svg-icon" component={ReactFontAwesomeIcon} examples={examples}/>
        </div>
    </div>
);

export default App;
