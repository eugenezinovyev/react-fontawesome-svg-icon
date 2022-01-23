import { VoidFunctionComponent } from 'react';
import clsx from 'clsx';
import Samples, { Sample } from './Samples';
import CodeHighlight from './CodeHighlight';
import classes from './SampleDemo.module.css';

type UsedIconsHash = { [key: string]: { [key: string]: boolean } };

const prefixImportMapping = {
    'fas': '@fortawesome/free-solid-svg-icons',
    'far': '@fortawesome/free-regular-svg-icons',
    'fab': '@fortawesome/free-brands-svg-icons',
};

const capitalize = (str: string) => `${ str[0].toUpperCase() }${ str.substring(1) }`;
const makeIconName = (name: string, prefix = 'fa') => `${ prefix }${ capitalize(name) }`;
const getIconPackage = (prefix: string) => prefixImportMapping[prefix];
const makeIconsImport = (prefix: string, icons: string[], useAlias: boolean) => {
    const iconNames = icons.map((name) => useAlias ? `${ (makeIconName(name)) } as ${ makeIconName(name, prefix) }` : makeIconName(name)).join(', ');
    const iconPackage = getIconPackage(prefix);

    return `import { ${ iconNames } } from '${ iconPackage }';`;
};

const formatPropValue = (propName: string, sample: Sample, useAlias: boolean) => {
    switch (propName) {
    case 'icon':
        return `${ propName }={${ useAlias ? makeIconName(sample.icon.iconName, sample.icon.prefix) : makeIconName(sample.icon.iconName) }}`;
    case 'style':
        return `${ propName }={${ JSON.stringify(sample[propName]) }}`;
    default: {
        if (typeof sample[propName] === 'boolean') {
            return sample[propName] ? propName : `${ propName }={false}`;
        } else {
            return `${ propName }="${ sample[propName] }"`;
        }
    }
    }
};

const formatSampleUsage = (sample: Sample, useAlias: boolean) => `<FontAwesomeSvgIcon${ (Object.keys(sample).map((propName) =>
    ` ${ (formatPropValue(propName, sample, useAlias)) }`).join('')) } />`;

const formatMultipleSamples = (samples: Sample[], useAlias: boolean) => {
    return `<>\n${ samples.map(sample => `  ${ formatSampleUsage(sample, useAlias) }`).join('\n') }\n</>`;
};

const collectUsedIcons = (samples: Sample[]): UsedIconsHash => samples.reduce<UsedIconsHash>((collector, sample) => {
    if (!Object.hasOwnProperty.call(collector, sample.icon.prefix)) {
        collector[sample.icon.prefix] = {};
    }

    collector[sample.icon.prefix][sample.icon.iconName] = true;

    return collector;
}, {});

const formatIconImports = (usedIcons: UsedIconsHash, useAlias: boolean) => Object.keys(usedIcons)
    .map(prefix => makeIconsImport(prefix, Object.keys(usedIcons[prefix]), useAlias))
    .join('\n');

const formatSamplesExample = (samples: Sample[]) => {
    const usedIcons = collectUsedIcons(samples);
    const useAlias = Object.keys(usedIcons).length > 1;
    const body = samples.length > 1
        ? formatMultipleSamples(samples, useAlias)
        : formatSampleUsage(samples[0], useAlias);

    return `import React from 'react';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
${ formatIconImports(usedIcons, useAlias) }

const Example = () => (
${ body.split('\n').map(line => `  ${ line }`).join('\n') }
);

export default Example;
`;
};

export type SampleDemoClasses = { root?: string, samples?: string };
export type SampleDemoProps = { className?: string, classes?: SampleDemoClasses, samples: Sample[] };

const SampleDemo: VoidFunctionComponent<SampleDemoProps> = ({ className, classes: passedClasses, samples }) => (
    <div className={ clsx(classes.root, passedClasses?.root, className) }>
        <Samples samples={ samples } className={ passedClasses?.samples }/>
        <CodeHighlight>
            { formatSamplesExample(samples) }
        </CodeHighlight>
    </div>
);

export default SampleDemo;
