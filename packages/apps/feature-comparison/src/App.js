import { FontAwesomeIcon as FortAwesomeReactFontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FontAwesomeIcon as ReactFontAwesomeIcon } from 'react-fontawesome-icon';
import { faCoffee, faCalendar as faCalendarSolid } from '@fortawesome/free-solid-svg-icons';
import { faCalendar as faCalendarRegular } from '@fortawesome/free-regular-svg-icons';
import classes from './App.module.css';

const examples = [
    ["Solid & Regular", [{ icon: faCalendarSolid, size: "lg" }, { icon: faCalendarRegular, size: "lg" }]],
    ["Sizes", [
        { icon: faCoffee, size: "xs" },
        { icon: faCoffee, size: "sm" },
        { icon: faCoffee, size: "lg" },
        { icon: faCoffee, size: "1x" },
        { icon: faCoffee, size: "2x" },
        { icon: faCoffee, size: "3x" },
        { icon: faCoffee, size: "4x" },
        { icon: faCoffee, size: "5x" },
        { icon: faCoffee, size: "6x" },
        { icon: faCoffee, size: "7x" },
        { icon: faCoffee, size: "8x" },
        { icon: faCoffee, size: "9x" },
        { icon: faCoffee, size: "10x" },
    ]],
    ["Title (hint)", [{ icon: faCoffee, size: "lg", title: "Icon title" }]],
    ["Custom Style and Color", [
        { icon: faCoffee, size: "lg", style: { backgroundColor: '#2e7dd1', color: '#ffffff', padding: '0.5rem' } },
        { icon: faCoffee, size: "lg", color: '#2e7dd1' },
    ]],
    ["Border, Fixed Width, Flip, Spin & Pulse", [
        { icon: faCoffee, size: "lg", border: true },
        { icon: faCoffee, size: "lg", fixedWidth: true },
        { icon: faCoffee, size: "lg", flip: 'horizontal' },
        { icon: faCoffee, size: "lg", flip: 'vertical' },
        { icon: faCoffee, size: "lg", flip: 'both' },
        { icon: faCoffee, size: "lg", spin: true },
        { icon: faCoffee, size: "lg", pulse: true },
    ]],
    ["Inverse", classes.exampleInverse, [{ icon: faCoffee, size: "lg", inverse: true }]],
];

const Example = ({ className, component: Component, title, samples }) => {
    return (
        <div className={[classes.example, className].filter(Boolean).join(' ')}>
            <h3>{title}</h3>
            <div className={classes.samples}>
                {samples.map((sample, index) => (
                    <Component key={index} {...sample} />
                ))}
            </div>
        </div>
    );
};

const ExampleCollection = ({ component: Component, title: collectionTitle }) => {
    return (
        <div className={classes.exampleCollection}>
            <header>
                <h2>{collectionTitle}</h2>
            </header>
            {examples.map((example, index) => {
                let title, className, samples;
                
                if (example.length === 3) {
                    [title, className, samples] = example;
                } else {
                    [title, samples] = example;
                }
                
                return (
                    <Example key={index} className={className} component={Component} title={title} samples={samples}/>
                );
            })}
        </div>
    );
};

const App = () => (
    <div className={classes.root}>
        <header>
            <h1>Features</h1>
        </header>
        <div className={classes.exampleCollections}>
            <ExampleCollection title="@fortawesome/react-fontawesome" component={FortAwesomeReactFontAwesomeIcon} />
            <ExampleCollection title="react-fontawesome-icon" component={ReactFontAwesomeIcon} />
        </div>
    </div>
);

export default App;
