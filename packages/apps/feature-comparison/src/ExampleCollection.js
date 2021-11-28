import React from 'react';
import { arrayOf, elementType, exact, oneOfType, string } from 'prop-types';
import SamplesExample from './SamplesExample';
import classes from './ExampleCollection.module.css';

const ExampleCollection = ({ examples, component: Component, title: collectionTitle }) => {
    return (
        <div className={classes.root}>
            <header className={classes.header}>
                <h2>{collectionTitle}</h2>
            </header>
            <section>
                {examples.map((example, index) => {
                    let title, className, samples, ExampleComponent;

                    if (example.length === 3) {
                        [ title, className, samples ] = example;
                    } else if (example.length === 2) {
                        [ title, samples ] = example;
                    } else {
                        [ ExampleComponent ] = example;
                    }

                    if (ExampleComponent) {
                        return <ExampleComponent key={index} component={Component}/>;
                    }

                    return (
                        <SamplesExample key={index} className={className} component={Component} title={title} samples={samples}/>
                    );
                })}
            </section>
        </div>
    );
};

ExampleCollection.propTypes = {
    examples: arrayOf(arrayOf(oneOfType([string, elementType, SamplesExample.propTypes.samples]))).isRequired,
    component: elementType.isRequired,
    title: string.isRequired,
};

export default ExampleCollection;
