import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FontAwesomeSvgIconProps } from '../src';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { IconDefinition, IconPathData } from '@fortawesome/fontawesome-common-types';
import { FlipProp, PullProp, RotateProp, SizeProp } from '@fortawesome/fontawesome-svg-core';

export type RenderFnArg = FontAwesomeSvgIconProps & { 'data-testid'?: string };
export type RenderFn = (props: RenderFnArg) => JSX.Element;

const commonTests = (name: string, renderFn: RenderFn) => {
    const renderElement = (props: RenderFnArg) => render(renderFn(props));

    it(`${name} should not fail when no icon specified`, () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(() => renderElement()).not.toThrow();
    });

    it.each<[IconDefinition, IconPathData]>([
        [faCoffee, faCoffee.icon[4]],
        [faCalendar, faCalendar.icon[4]],
    ])(`${name} should process 'icon' prop with solid icon`, (icon, expectedPathData) => {
        const { container } = renderElement({ 'data-testid': 'icon', icon });
        expect(container.querySelector('path')).toHaveAttribute('d', expectedPathData);
    });

    test.each<[SizeProp, string]>([
        ['xs', 'fa-xs'],
        ['lg', 'fa-lg'],
        ['sm', 'fa-sm'],
        ['1x', 'fa-1x'],
        ['2x', 'fa-2x'],
        ['3x', 'fa-3x'],
        ['4x', 'fa-4x'],
        ['5x', 'fa-5x'],
        ['6x', 'fa-6x'],
        ['7x', 'fa-7x'],
        ['8x', 'fa-8x'],
        ['9x', 'fa-9x'],
        ['10x', 'fa-10x'],
    ])(`${name} should process '%s' size`, (size, expectedClass) => {
        renderElement({ 'data-testid': 'icon', icon: faCoffee, size });

        expect(screen.getByTestId('icon')).toHaveClass(expectedClass);
    });

    it(`${name} should process 'className' prop`, () => {
        renderElement({ 'data-testid': 'icon', icon: faCoffee, className: 'custom-class-name' });

        expect(screen.getByTestId('icon')).toHaveClass('custom-class-name');
    });

    it(`${name} should process 'style' prop`, () => {
        renderElement({ 'data-testid': 'icon', icon: faCoffee, style: { backgroundColor: 'red' } });

        expect(screen.getByTestId('icon')).toHaveStyle('background-color: red;');
    });

    it(`${name} should process 'title' prop`, () => {
        renderElement({ 'data-testid': 'icon', icon: faCoffee, title: 'test-title' });

        expect(screen.getByLabelText('test-title')).toBeInTheDocument();
    });

    it(`${name} should process 'color' prop`, () => {
        renderElement({ 'data-testid': 'icon', icon: faCoffee, color: '#ddd' });

        expect(screen.getByTestId('icon')).toHaveAttribute('color', '#ddd');
    });

    it(`${name} should process 'border' prop`, () => {
        renderElement({ 'data-testid': 'icon', icon: faCoffee, border: true });

        expect(screen.getByTestId('icon')).toHaveClass('fa-border');
    });

    it(`${name} should process 'fixedWidth' prop`, () => {
        renderElement({ 'data-testid': 'icon', icon: faCoffee, fixedWidth: true });

        expect(screen.getByTestId('icon')).toHaveClass('fa-fw');
    });

    it.each<[FlipProp, string]>([
        ['vertical', 'fa-flip-vertical'],
        ['horizontal', 'fa-flip-horizontal'],
        ['both', 'fa-flip-both'],
    ])(`${name} should process '%s' flip`, (flip, expectedClass) => {
        renderElement({ 'data-testid': 'icon', icon: faCoffee, flip });

        expect(screen.getByTestId('icon')).toHaveClass(expectedClass);
    });

    it(`${name} should process 'spin' prop`, () => {
        renderElement({ 'data-testid': 'icon', icon: faCoffee, spin: true });

        expect(screen.getByTestId('icon')).toHaveClass('fa-spin');
    });

    it(`${name} should process 'pulse' prop`, () => {
        renderElement({ 'data-testid': 'icon', icon: faCoffee, pulse: true });

        expect(screen.getByTestId('icon')).toHaveClass('fa-pulse');
    });

    it(`${name} should process 'inverse' prop`, () => {
        renderElement({ 'data-testid': 'icon', icon: faCoffee, inverse: true });

        expect(screen.getByTestId('icon')).toHaveClass('fa-inverse');
    });

    it(`${name} should process 'listItem' prop`, () => {
        renderElement({ 'data-testid': 'icon', icon: faCoffee, listItem: true });

        expect(screen.getByTestId('icon')).toHaveClass('fa-li');
    });

    it(`${name} should process 'swapOpacity' prop`, () => {
        renderElement({ 'data-testid': 'icon', icon: faCoffee, swapOpacity: true });

        expect(screen.getByTestId('icon')).toHaveClass('fa-swap-opacity');
    });

    it.each<[PullProp, string]>([
        ['left', 'fa-pull-left'],
        ['right', 'fa-pull-right'],
    ])(`${name} should process '%s' pull`, (pull, expectedClass) => {
        renderElement({ 'data-testid': 'icon', icon: faCoffee, pull });

        expect(screen.getByTestId('icon')).toHaveClass(expectedClass);
    });

    it.each<[RotateProp, string]>([
        [90, 'fa-rotate-90'],
        [180, 'fa-rotate-180'],
        [270, 'fa-rotate-270'],
    ])(`${name} should process '%s' rotation`, (rotation, expectedClass) => {
        renderElement({ 'data-testid': 'icon', icon: faCoffee, rotation });

        expect(screen.getByTestId('icon')).toHaveClass(expectedClass);
    });
};

export default commonTests;
