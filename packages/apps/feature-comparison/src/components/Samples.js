import React from 'react';
import { arrayOf, number, oneOfType, shape, string } from 'prop-types';
import clsx from 'clsx';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import classes from './Samples.module.css';

const Samples = ({ className, samples }) => (
    <div className={clsx(classes.root, className)}>
        {samples.map((sample, index) => <FontAwesomeSvgIcon key={index} {...sample} />)}
    </div>
);

const IconDefinitionPropType = shape({
    prefix: string,
    iconName: string,
    icon: arrayOf(oneOfType([ number, string, arrayOf(string) ]))
});


Samples.propTypes = {
    className: string,
    samples: arrayOf(shape({ icon: IconDefinitionPropType })).isRequired,
};

Samples.defaultProps = {
    className: undefined,
};

export default Samples;
