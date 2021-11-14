import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FontAwesomeSvgIcon } from '../src';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { FlipProp, PullProp, RotateProp, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { IconDefinition, IconPathData } from '@fortawesome/fontawesome-common-types';

describe('<FontAwesomeSvgIcon />', () => {
    it('should not fail when no icon specified', () => {
        // @ts-ignore
        expect(() => render(<FontAwesomeSvgIcon />)).not.toThrow();
    });
    
    const iconCases: [IconDefinition, IconPathData][] = [
        [faCoffee, faCoffee.icon[4]],
        [faCalendar, faCalendar.icon[4]],
    ];
    
    it.each(iconCases)("should process 'icon' prop with solid icon", (icon, expectedPathData) => {
        const { container } = render(<FontAwesomeSvgIcon data-testid="icon" icon={icon} />);
        expect(container.querySelector('path')).toHaveAttribute('d', expectedPathData);
    });

    const sizeCases: [SizeProp, string][] = [
        ["xs", "fa-xs"],
        ["lg", "fa-lg"],
        ["sm", "fa-sm"],
        ["1x", "fa-1x"],
        ["2x", "fa-2x"],
        ["3x", "fa-3x"],
        ["4x", "fa-4x"],
        ["5x", "fa-5x"],
        ["6x", "fa-6x"],
        ["7x", "fa-7x"],
        ["8x", "fa-8x"],
        ["9x", "fa-9x"],
        ["10x", "fa-10x"],
    ];

    test.each(sizeCases)("should process '%s' size", (size, expectedClass) => {
        render(<FontAwesomeSvgIcon data-testid="icon" icon={faCoffee} size={size} />);

        expect(screen.getByTestId('icon')).toHaveClass(expectedClass);
    });

    it("should process 'className' prop", () => {
        render(<FontAwesomeSvgIcon data-testid="icon" icon={faCoffee} className="custom-class-name" />);

        expect(screen.getByTestId('icon')).toHaveClass("custom-class-name");
    });

    it("should process 'style' prop", () => {
        render(<FontAwesomeSvgIcon data-testid="icon" icon={faCoffee} style={{ backgroundColor: 'red' }} />);

        expect(screen.getByTestId('icon')).toHaveStyle("background-color: red;");
    });

    it("should process 'title' prop", () => {
        render(<FontAwesomeSvgIcon data-testid="icon" icon={faCoffee} title="test-title" />);

        expect(screen.getByLabelText('test-title')).toBeInTheDocument();
    });

    it("should process 'color' prop", () => {
        render(<FontAwesomeSvgIcon data-testid="icon" icon={faCoffee} color="#ddd" />);

        expect(screen.getByTestId('icon')).toHaveAttribute("color", "#ddd");
    });

    it("should process 'border' prop", () => {
        render(<FontAwesomeSvgIcon data-testid="icon" icon={faCoffee} border/>);

        expect(screen.getByTestId('icon')).toHaveClass("fa-border");
    });

    it("should process 'fixedWidth' prop", () => {
        render(<FontAwesomeSvgIcon data-testid="icon" icon={faCoffee} fixedWidth />);

        expect(screen.getByTestId('icon')).toHaveClass("fa-fw");
    });
    
    const flipCases: [FlipProp, string][] = [
        ['vertical', 'fa-flip-vertical'],
        ['horizontal', 'fa-flip-horizontal'],
        ['both', 'fa-flip-both']
    ];

    it.each(flipCases)("should process '%s' flip", (flip, expectedClass) => {
        render(<FontAwesomeSvgIcon data-testid="icon" icon={faCoffee} flip={flip} />);

        expect(screen.getByTestId('icon')).toHaveClass(expectedClass);
    });

    it("should process 'spin' prop", () => {
        render(<FontAwesomeSvgIcon data-testid="icon" icon={faCoffee} spin />);

        expect(screen.getByTestId('icon')).toHaveClass("fa-spin");
    });
    
    it("should process 'pulse' prop", () => {
        render(<FontAwesomeSvgIcon data-testid="icon" icon={faCoffee} pulse />);

        expect(screen.getByTestId('icon')).toHaveClass("fa-pulse");
    });

    it("should process 'inverse' prop", () => {
        render(<FontAwesomeSvgIcon data-testid="icon" icon={faCoffee} inverse />);

        expect(screen.getByTestId('icon')).toHaveClass("fa-inverse");
    });

    it("should process 'listItem' prop", () => {
        render(<FontAwesomeSvgIcon data-testid="icon" icon={faCoffee} listItem />);

        expect(screen.getByTestId('icon')).toHaveClass("fa-li");
    });

    it("should process 'swapOpacity' prop", () => {
        render(<FontAwesomeSvgIcon data-testid="icon" icon={faCoffee} swapOpacity />);

        expect(screen.getByTestId('icon')).toHaveClass("fa-swap-opacity");
    });

    const pullCases: [PullProp, string][] = [
        ['left', 'fa-pull-left'],
        ['right', 'fa-pull-right'],
    ]

    it.each(pullCases)("should process '%s' pull", (pull, expectedClass) => {
        render(<FontAwesomeSvgIcon data-testid="icon" icon={faCoffee} pull={pull} />);

        expect(screen.getByTestId('icon')).toHaveClass(expectedClass);
    });

    const rotationCases: [RotateProp, string][] = [
        [90, 'fa-rotate-90'],
        [180, 'fa-rotate-180'],
        [270, 'fa-rotate-270'],
    ]

    it.each(rotationCases)("should process '%s' rotation", (rotation, expectedClass) => {
        render(<FontAwesomeSvgIcon data-testid="icon" icon={faCoffee} rotation={rotation} />);

        expect(screen.getByTestId('icon')).toHaveClass(expectedClass);
    });
});