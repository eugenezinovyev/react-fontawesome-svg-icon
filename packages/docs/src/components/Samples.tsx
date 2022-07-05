import { FunctionComponent } from 'react';
import clsx from 'clsx';
import { FontAwesomeSvgIcon, FontAwesomeSvgIconProps } from 'react-fontawesome-svg-icon';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import classes from './Samples.module.css';

export type Sample = Omit<Partial<FontAwesomeSvgIconProps>, 'icon'> & { icon: IconDefinition };
export type SamplesProps = { className: string | undefined, samples: Sample[] };

const Samples: FunctionComponent<SamplesProps> = ({ className, samples }) => (
    <div className={ clsx(classes.root, className) }>
        { samples.map((sample, index) => <FontAwesomeSvgIcon key={ index } { ...sample } />) }
    </div>
);

export default Samples;
