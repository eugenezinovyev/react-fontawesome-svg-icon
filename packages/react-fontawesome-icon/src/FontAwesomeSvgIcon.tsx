import React, { CSSProperties, ForwardedRef, forwardRef, ForwardRefExoticComponent, SVGAttributes } from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { FlipProp, SizeProp } from '@fortawesome/fontawesome-svg-core';

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
}

const clsx = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');
const randomID = (): string => Math.random().toString(36).substr(2);

/**
 * FontAwesome SVG icon component.
 * */
export const FontAwesomeSvgIcon: ForwardRefExoticComponent<FontAwesomeSvgIconProps> = forwardRef(
    (props: FontAwesomeSvgIconProps, ref: ForwardedRef<SVGSVGElement>): JSX.Element | null => {
        const { icon, size, className, title, border, fixedWidth, flip, spin, pulse, inverse, ...restProps } = props;

        if (!icon) {
            return null;
        }

        const { iconName, icon: [width, height, , , vectorData] } = icon;

        const svgClassName = clsx(
            'svg-inline--fa',
            `fa-${iconName}`,
            `fa-w-${Math.ceil(width / height * 16)}`,
            size && `fa-${ size }`,
            border && 'fa-border',
            fixedWidth && 'fa-fw',
            flip && `fa-flip-${flip}`,
            spin && `fa-spin`,
            pulse && `fa-pulse`,
            inverse && `fa-inverse`,
            className,
        );
        const ariaLabelledBy = title ? randomID() : undefined;

        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-labelledby={ariaLabelledBy}
                ref={ ref }
                role="img"
                viewBox={ `0 0 ${width} ${height}` }
                className={svgClassName}
                {...restProps}
            >
                {ariaLabelledBy && <title id={ariaLabelledBy}>{title}</title>}
                <path fill="currentColor" d={vectorData.toString()}/>
            </svg>
        );
    });
