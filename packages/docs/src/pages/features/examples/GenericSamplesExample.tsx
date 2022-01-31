import { VoidFunctionComponent } from 'react';
import Example from '../../../components/Example';
import SampleDemo, { SampleDemoClasses } from '../../../components/SampleDemo';
import { Sample } from '../../../components/Samples';

export type GenericSamplesClasses = { root?: string, demo?: SampleDemoClasses };
export type GenericSamplesExampleProps = { id: string, title: string, samples: Sample[], classes?: GenericSamplesClasses };

const GenericSamplesExample: VoidFunctionComponent<GenericSamplesExampleProps> = ({ id, title, samples, classes }) => (
    <Example id={ id } title={ title } className={ classes?.root }>
        <SampleDemo samples={ samples } classes={ classes?.demo }/>
    </Example>
);

export default GenericSamplesExample;
