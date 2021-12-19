import React from 'react';
import { arrayOf, elementType, exact, number, oneOfType, shape, string } from 'prop-types';
import ExampleLayout from './ExampleLayout';
import classes from './SamplesExample.module.css';

const SamplesExample = ({ className, component: Component, title, samples }) => (
    <ExampleLayout className={className} title={title}>
        <div className={classes.root}>
            {samples.map((sample, index) => (
                <Component key={index} {...sample} />
            ))}
        </div>
    </ExampleLayout>
);

const IconDefinitaionPropType = shape({
    prefix: string,
    iconName: string,
    icon: arrayOf(oneOfType([number, string, arrayOf(string)]))
});

SamplesExample.propTypes = {
    className: string,
    component: elementType.isRequired,
    title: string.isRequired,
    samples: arrayOf(shape({ icon: IconDefinitaionPropType })).isRequired,
};

export default SamplesExample;
