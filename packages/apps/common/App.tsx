import React, { CSSProperties } from 'react';
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { FlipProp, SizeProp } from '@fortawesome/fontawesome-svg-core';

export type IconProps = {
    size?: SizeProp,
    className?: string,
    style?: CSSProperties,
    title?: string,
    color?: string,
    border?: boolean,
    fixedWidth?: boolean,
    flip?: FlipProp,
    spin?: boolean,
    pulse?: boolean,
    inverse?: boolean,
}

export type RenderIconProps = IconProps & { icon: IconDefinition };

interface AppProps {
    renderIcon: (props: RenderIconProps) => JSX.Element,
}

const sizes: SizeProp[] = ['xs', 'sm', 'lg', '1x', '2x', '3x', '4x', '5x', '6x', '7x', '8x', '9x', '10x'];

const propCollection: IconProps[] = [
    { title: 'Title' },
    { style: { backgroundColor: '#8340a8', color: '#ffffff', padding: '0.5rem' } },
    { className: 'shadow-icon' },
    { color: '#38ce8f' },
    { border: true },
    { spin: true },
    { fixedWidth: true },
    { flip: 'horizontal' },
    { flip: 'vertical' },
    { flip: 'both' },
    { pulse: true },
    { inverse: true },
];

const App = ({ renderIcon }: AppProps): JSX.Element => (
    <div>
        <h1>Sizes</h1>
        <table>
            <thead>
            <tr>
                <th>Props</th>
                <th>Icon</th>
            </tr>
            </thead>
            <tbody>
            {sizes.map((size) => (
                <tr key={size}>
                    <td>{size}</td>
                    <td>{renderIcon({ icon: faCoffee, size })}</td>
                </tr>
            ))}
            </tbody>
        </table>
        <h1>Props</h1>
        <table>
            <thead>
            <tr>
                <th>Props</th>
                <th>Icon</th>
            </tr>
            </thead>
            <tbody>
            {propCollection.map((props, index) => (
                <tr key={index}>
                    <td>{JSON.stringify(props)}</td>
                    <td>{renderIcon({ icon: faCoffee, size: "lg", ...props })}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
);

export default App;
