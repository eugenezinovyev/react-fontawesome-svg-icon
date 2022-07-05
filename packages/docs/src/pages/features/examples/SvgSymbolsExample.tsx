import { FunctionComponent } from 'react';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faCoffee, faHeart } from '@fortawesome/free-solid-svg-icons';

const weirdProgrammingLanguages: string[] = [
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

const styles = {
    container: { display: 'flex' },
    title: { flex: 1 },
    icon: { width: '1.25rem', height: '1.25rem', margin: '0.5rem' },
};

const Example: FunctionComponent = () => {
    return (
        <>
            <FontAwesomeSvgIcon icon={ faHeart } symbol/>
            <FontAwesomeSvgIcon icon={ faCoffee } symbol="beverage-icon"/>
            { weirdProgrammingLanguages.map((language) => (
                <div key={ language } style={ styles.container }>
                    <span style={ styles.title }>{ language }</span>
                    <svg style={ styles.icon }>
                        <use xlinkHref="#fas-heart"/>
                    </svg>
                    <svg style={ styles.icon }>
                        <use xlinkHref="#beverage-icon"/>
                    </svg>
                </div>
            )) }
        </>
    );
};

export default Example;
