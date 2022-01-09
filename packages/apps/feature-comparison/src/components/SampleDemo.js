import React from 'react';
import { string, shape } from 'prop-types';
import clsx from 'clsx';
import Samples from './Samples';
import CodeHighlight from './CodeHighlight';
import classes from './SampleDemo.module.css';

const prefixImportMapping = {
    'fas': '@fortawesome/free-solid-svg-icons',
    'far': '@fortawesome/free-regular-svg-icons',
};

const capitalize = (str) => `${str[0].toUpperCase()}${str.substring(1)}`;
const makeIconName = (name, prefix = 'fa') => `${prefix}${capitalize(name)}`;
const getIconPackage = (prefix) => prefixImportMapping[prefix];
const makeIconsImport = (prefix, icons, useAlias) => {
    const iconNames = icons.map((name) => useAlias ? `${(makeIconName(name))} as ${makeIconName(name, prefix)}` : makeIconName(name)).join(', ');
    const iconPackage = getIconPackage(prefix);

    return `import { ${iconNames} } '${iconPackage}';`;
};

const formatPropValue = (propName, sample, useAlias) => {
    switch (propName) {
    case 'icon':
        return `${propName}={${useAlias ? makeIconName(sample.icon.iconName, sample.icon.prefix) : makeIconName(sample.icon.iconName)}}`;
    case 'style':
        return `${propName}={${JSON.stringify(sample[propName])}}`;
    default: {
        if (typeof sample[propName] === 'boolean') {
            return sample[propName] ? propName : `${propName}={false}`;
        } else {
            return `${propName}="${sample[propName]}"`;
        }
    }
    }
};

const formatSampleUsage = (sample, useAlias) => `<FontAwesomeSvgIcon${(Object.keys(sample).map((propName) =>
    ` ${(formatPropValue(propName, sample, useAlias))}`).join(''))} />`;

const formatMultipleSamples = (samples, useAlias) => {
    return `<>\n${samples.map(sample => `  ${formatSampleUsage(sample, useAlias)}`).join('\n')}\n</>`;
};

const collectUsedIcons = (samples) => samples.reduce((collector, sample) => {
    if (!Object.hasOwnProperty.call(collector, sample.icon.prefix)) {
        collector[sample.icon.prefix] = {};
    }

    collector[sample.icon.prefix][sample.icon.iconName] = true;

    return collector;
}, {});

const formatIconImports = (usedIcons, useAlias) => Object.keys(usedIcons)
    .map(prefix => makeIconsImport(prefix, Object.keys(usedIcons[prefix]), useAlias))
    .join('\n');

const formatSamplesExample = (samples) => {
    const usedIcons = collectUsedIcons(samples);
    const useAlias = Object.keys(usedIcons).length > 1;
    const body = samples.length > 1
        ? formatMultipleSamples(samples, useAlias)
        : formatSampleUsage(samples[0], useAlias);

    return `import React from 'react';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
${formatIconImports(usedIcons, useAlias)}

const Example = () => (
${body.split('\n').map(line => `  ${line}`).join('\n')}
);

export default Example;
`;
};

const SampleDemo = ({ className, classes: passedClasses, samples }) => (
    <div className={clsx(classes.root, passedClasses?.root, className)}>
        <Samples samples={samples} className={passedClasses?.samples}/>
        <CodeHighlight>
            {formatSamplesExample(samples)}
        </CodeHighlight>
    </div>
);

SampleDemo.propTypes = {
    className: string,
    samples: Samples.propTypes.samples,
    classes: shape({
        root: string,
        samples: string,
    }),
};

SampleDemo.defaultProps = {
    className: undefined,
    classes: undefined,
};

export default SampleDemo;
