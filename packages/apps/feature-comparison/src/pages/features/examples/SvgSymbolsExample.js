import React from 'react';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faCoffee, faHeart } from '@fortawesome/free-solid-svg-icons';

const weirdProgrammingLanguages = [
    'LOLCODE',
    'Rockstar',
    'TrumpScript',
    'Brainf*ck',
    'Shakespeare',
    'Whitespace',
    'Velato',
    'Chicken',
    'Piet',
    'Befunge',
];

const Example = () => {
    return (
        <>
            <FontAwesomeSvgIcon icon={faHeart} symbol />
            <FontAwesomeSvgIcon icon={faCoffee} symbol="beverage-icon" />
            {weirdProgrammingLanguages.map((language) => (
                <div key={language} style={{ display: 'flex' }}>
                    <span style={{ flex: 1 }}>{language}</span>
                    <svg style={{ width: '1.25rem', height: '1.25rem', margin: '0.5rem' }}><use xlinkHref="#fas-heart"/></svg>
                    <svg style={{ width: '1.25rem', height: '1.25rem', margin: '0.5rem' }}><use xlinkHref="#beverage-icon"/></svg>
                </div>
            ))}
        </>
    );
};

export default Example;
