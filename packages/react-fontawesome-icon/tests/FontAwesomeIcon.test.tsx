import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FontAwesomeIcon } from '../src/index';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { FlipProp, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { IconDefinition, IconPathData } from '@fortawesome/fontawesome-common-types';

describe('<FontAwesomeIcon />', () => {
    it('should not fail when no icon specified', () => {
        // @ts-ignore
        expect(() => render(<FontAwesomeIcon />)).not.toThrow();
    });
    
    const iconCases: [IconDefinition, IconPathData][] = [
        [faCoffee, faCoffee.icon[4]],
        [faCalendar, faCalendar.icon[4]],
    ];
    
    it.each(iconCases)("should process 'icon' prop with solid icon", (icon, expectedPathData) => {
        const { container } = render(<FontAwesomeIcon data-testid="icon" icon={icon} />);
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
        render(<FontAwesomeIcon data-testid="icon" icon={faCoffee} size={size} />);

        expect(screen.getByTestId('icon')).toHaveClass(expectedClass);
    });

    it("should process 'className' prop", () => {
        render(<FontAwesomeIcon data-testid="icon" icon={faCoffee} className="custom-class-name" />);

        expect(screen.getByTestId('icon')).toHaveClass("custom-class-name");
    });

    it("should process 'style' prop", () => {
        render(<FontAwesomeIcon data-testid="icon" icon={faCoffee} style={{ backgroundColor: 'red' }} />);

        expect(screen.getByTestId('icon')).toHaveStyle("background-color: red;");
    });

    it("should process 'title' prop", () => {
        render(<FontAwesomeIcon data-testid="icon" icon={faCoffee} title="test-title" />);

        expect(screen.getByLabelText('test-title')).toBeInTheDocument();
    });

    it("should process 'color' prop", () => {
        render(<FontAwesomeIcon data-testid="icon" icon={faCoffee} color="#ddd" />);

        expect(screen.getByTestId('icon')).toHaveAttribute("color", "#ddd");
    });

    it("should process 'border' prop", () => {
        render(<FontAwesomeIcon data-testid="icon" icon={faCoffee} border/>);

        expect(screen.getByTestId('icon')).toHaveClass("fa-border");
    });

    it("should process 'fixedWidth' prop", () => {
        render(<FontAwesomeIcon data-testid="icon" icon={faCoffee} fixedWidth />);

        expect(screen.getByTestId('icon')).toHaveClass("fa-fw");
    });
    
    const flipCases: [FlipProp, string][] = [
        ['vertical', 'fa-flip-vertical'],
        ['horizontal', 'fa-flip-horizontal'],
        ['both', 'fa-flip-both']
    ];

    it.each(flipCases)("should process '%s' flip", (flip, expectedClass) => {
        render(<FontAwesomeIcon data-testid="icon" icon={faCoffee} flip={flip} />);

        expect(screen.getByTestId('icon')).toHaveClass(expectedClass);
    });

    it("should process 'spin' prop", () => {
        render(<FontAwesomeIcon data-testid="icon" icon={faCoffee} spin />);

        expect(screen.getByTestId('icon')).toHaveClass("fa-spin");
    });
    
    it("should process 'pulse' prop", () => {
        render(<FontAwesomeIcon data-testid="icon" icon={faCoffee} pulse />);

        expect(screen.getByTestId('icon')).toHaveClass("fa-pulse");
    });

    it("should process 'inverse' prop", () => {
        render(<FontAwesomeIcon data-testid="icon" icon={faCoffee} inverse />);

        expect(screen.getByTestId('icon')).toHaveClass("fa-inverse");
    });
});