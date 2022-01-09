import React from 'react';
import GenericSamplesExample from '../examples/GenericSamplesExample';
import ListItem from '../examples/ListItem';
import { faCalendar as fasCalendar, faCoffee, faHeart, faSnowboarding } from '@fortawesome/free-solid-svg-icons';
import { faCalendar as farCalendar } from '@fortawesome/free-regular-svg-icons';
import classes from './Features.module.css';

const families = [ { icon: fasCalendar, size: 'lg' }, { icon: farCalendar, size: 'lg' } ];
const sizes = [
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
];
const title = [ { icon: faCoffee, size: 'lg', title: 'Icon title' } ];
const styling = [
    { icon: faCoffee, size: 'lg', style: { backgroundColor: '#2e7dd1', color: '#ffffff', padding: '0.5rem' } },
    { icon: faCoffee, size: 'lg', color: '#2e7dd1' },
];
const bordered = [ { icon: faCoffee, size: 'lg', border: true } ];
const fixedWidth = [ { icon: faCoffee, size: 'lg', fixedWidth: true } ];
const flip = [
    { icon: faCoffee, size: 'lg', flip: 'horizontal' },
    { icon: faCoffee, size: 'lg', flip: 'vertical' },
    { icon: faCoffee, size: 'lg', flip: 'both' },
];
const animation = [
    { icon: faCoffee, size: 'lg', spin: true },
    { icon: faCoffee, size: 'lg', pulse: true },
];
const rotation = [
    { icon: faSnowboarding, size: '2x' },
    { icon: faSnowboarding, size: '2x', rotation: 90 },
    { icon: faSnowboarding, size: '2x', rotation: 180 },
    { icon: faSnowboarding, size: '2x', rotation: 270 },
];
const pull = [
    { icon: faCoffee, size: 'lg', pull: 'left' },
    { icon: faCoffee, size: 'lg', pull: 'right' },
];
const tabIndex = [
    { icon: faCoffee, size: 'lg', tabIndex: 1 },
    { icon: faHeart, size: 'lg', tabIndex: 2 },
];
const swapOpacity = [ { icon: faCoffee, size: 'lg', swapOpacity: true } ];
const inverse = [ { icon: faCoffee, size: 'lg', inverse: true } ];

const Features = () => {
    return (
        <>
            <GenericSamplesExample id="families" title="Icon Families" samples={families} />
            <GenericSamplesExample id="sizes" title="Icon Sizes" samples={sizes} />
            <GenericSamplesExample id="title" title="Icon Title" samples={title} />
            <GenericSamplesExample id="styling" title="Custom Styles & Color" samples={styling} />
            <GenericSamplesExample id="bordered" title="Bordered Icons" samples={bordered} />
            <GenericSamplesExample id="fixed-width" title="Fixed Width Icons" samples={fixedWidth} />
            <GenericSamplesExample id="flip" title="Flipped Icons" samples={flip} />
            <GenericSamplesExample id="animation" title="Animation: Spin & Pulse" samples={animation} />
            <GenericSamplesExample id="rotation" title="Rotate Icons" samples={rotation} />
            <GenericSamplesExample id="inverse" title="Inverse Color" samples={inverse} classes={{ demo: { samples: classes.inverseSamples } }} />
            <ListItem />
            <GenericSamplesExample id="pull" title="Pulled Icons" samples={pull} />
            <GenericSamplesExample id="tab-index" title="Tab Index" samples={tabIndex} />
            <GenericSamplesExample id="swap-opacity" title="Swap Opacity" samples={swapOpacity} />
        </>
    );
};

export default Features;
