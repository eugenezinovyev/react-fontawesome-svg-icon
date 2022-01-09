import React from 'react';
import { shape, string } from 'prop-types';
import Example from '../components/Example';
import SampleDemo from '../components/SampleDemo';

const GenericSamplesExample = ({ id, title, samples, classes }) => (
    <Example id={id} title={title} className={classes?.root}>
        <SampleDemo samples={samples} classes={classes?.demo}/>
    </Example>
);

GenericSamplesExample.propTypes = {
    id: string.isRequired,
    title: string.isRequired,
    samples: SampleDemo.propTypes.samples,
    classes: shape({
        root: string,
        demo: SampleDemo.propTypes.classes,
    }),
};

export default GenericSamplesExample;
