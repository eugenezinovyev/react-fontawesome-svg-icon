import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FontAwesomeSvgIcon } from '../src';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import commonTests from './FontAwesomeIcon.common';

describe('<FontAwesomeSvgIcon /> SVG symbol tests', () => {
    it('should render hidden SVG when symbol requested', () => {
        const { container } = render(<FontAwesomeSvgIcon data-testid="icon" icon={ faCoffee } symbol/>);

        const svgElement = container.querySelector<SVGElement>('svg');
        expect(svgElement).toBeInTheDocument();
        expect(svgElement).not.toBeVisible();
        expect(Array.from(svgElement?.attributes ?? []).map(attr => attr.name)).toEqual(['style']);
    });

    it('should render SVG symbol with automatic identifier', () => {
        const { container } = render(<FontAwesomeSvgIcon data-testid="icon" icon={ faCoffee } symbol/>);

        const symbol = container.querySelector('symbol');
        expect(symbol?.id).toBe(`${ faCoffee.prefix }-${ faCoffee.iconName }`);
    });

    it('should render SVG symbol with passed identifier', () => {
        const { container } = render(<FontAwesomeSvgIcon data-testid="icon" icon={ faCoffee } symbol="beverage-icon"/>);

        const symbol = container.querySelector('symbol');
        expect(symbol?.id).toBe('beverage-icon');
    });

    commonTests('<FontAwesomeSvgIcon symbol />', props => <FontAwesomeSvgIcon { ...props } symbol/>);
});