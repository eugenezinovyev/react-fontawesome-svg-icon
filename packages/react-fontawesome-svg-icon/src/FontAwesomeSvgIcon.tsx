import React, { CSSProperties, ForwardedRef, forwardRef, ForwardRefExoticComponent, SVGAttributes } from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { FlipProp, PullProp, RotateProp, SizeProp } from '@fortawesome/fontawesome-svg-core';

/**
 * FontAwesome SVG icon properties type.
 * @noInheritDoc
 */
export interface FontAwesomeSvgIconProps extends Omit<SVGAttributes<SVGSVGElement>, 'children' | 'mask' | 'transform'> {
    /** Icon to render. */
    icon: IconDefinition,
    /** Icon size */
    size?: SizeProp,
    /** Class to add to the root SVG element. */
    className?: string,
    /** Style to add to the root SVG element. */
    style?: CSSProperties,
    /** Icon title. Uses area-labelledby attribute. */
    title?: string,
    /** Icon color. */
    color?: string,
    /** Bordered icon. */
    border?: boolean,
    /** Fixed width icon. */
    fixedWidth?: boolean,
    /** Flip of the icon. Check FontAwesome power transforms documentation. */
    flip?: FlipProp,
    /** Spin animation. Check FontAwesome animation documentation. */
    spin?: boolean,
    /** Pulse animation. Rotates icon in steps. Check FontAwesome animation documentation. */
    pulse?: boolean,
    /** Inverse colors. Check FontAwesome "fa-inverse" class. */
    inverse?: boolean,
    /** List item icon. Check FontAwesome documentation. */
    listItem?: boolean,
    /** Pull icon. Check FontAwesome documentation. */
    pull?: PullProp,
    /** Swap icon opacity. Check FontAwesome documentation for duotone icons Swapping Layer Opacity. */
    swapOpacity?: boolean;
    /** Rotate icon. Check FontAwesome icon rotation documentation. */
    rotation?: RotateProp
}

const clsx = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');
const randomID = (): string => Math.random().toString(36).substr(2);

const buildClassName = (props: FontAwesomeSvgIconProps) => {
    const { icon, size, className, border, fixedWidth, flip, spin, pulse, inverse, listItem, pull, swapOpacity, rotation } = props; 
    const { iconName, icon: [width, height] } = icon;

    return clsx(
        'svg-inline--fa',
        `fa-${iconName}`,
        `fa-w-${Math.ceil(width / height * 16)}`,
        size && `fa-${size}`,
        border && 'fa-border',
        fixedWidth && 'fa-fw',
        flip && `fa-flip-${flip}`,
        spin && 'fa-spin',
        pulse && 'fa-pulse',
        inverse && 'fa-inverse',
        listItem && 'fa-li',
        pull && `fa-pull-${pull}`,
        swapOpacity && 'fa-swap-opacity',
        rotation && `fa-rotate-${rotation}`,
        className,
    );
};

/**
 * FontAwesome SVG icon component.
 * */
export const FontAwesomeSvgIcon: ForwardRefExoticComponent<FontAwesomeSvgIconProps> = forwardRef(
    function FontAwesomeSvgIcon(props: FontAwesomeSvgIconProps, ref: ForwardedRef<SVGSVGElement>): JSX.Element | null {
        const { icon, title, role, ...restProps } = props;

        if (!icon) {
            return null;
        }

        const { icon: [width, height, , , vectorData] } = icon;

        const svgClassName = buildClassName(props);
        const ariaLabelledBy = title ? randomID() : undefined;

        return (
            <svg
                className={ svgClassName }
                role={ role || 'img' }
                xmlns="http://www.w3.org/2000/svg"
                aria-labelledby={ ariaLabelledBy }
                ref={ ref }
                viewBox={ `0 0 ${ width } ${ height }` }
                { ...restProps }
            >
                { ariaLabelledBy && <title id={ ariaLabelledBy }>{ title }</title> }
                <path fill="currentColor" d={ vectorData.toString() }/>
            </svg>
        );
    });
