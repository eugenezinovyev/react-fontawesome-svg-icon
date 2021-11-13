import React, { forwardRef, CSSProperties, SVGAttributes, ForwardedRef } from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { FlipProp, SizeProp } from '@fortawesome/fontawesome-svg-core';

export interface FontAwesomeIconProps extends Omit<SVGAttributes<SVGSVGElement>, 'children' | 'mask' | 'transform'> {
    icon: IconDefinition,
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

const clsx = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');
const randomID = (): string => Math.random().toString(36).substr(2);

const FontAwesomeIcon = forwardRef((props: FontAwesomeIconProps,ref: ForwardedRef<SVGSVGElement>): JSX.Element | null => {
    const { icon, size, className, title, border, fixedWidth, flip, spin, pulse, inverse, ...restProps } = props;
    
    if (!icon) {
        return null;
    }

    const { iconName, icon: [width, height, , , vectorData] } = icon;

    const svgClassName = clsx(
        'svg-inline--fa',
        `fa-${iconName}`,
        `fa-w-${Math.ceil(width / height * 16)}`,
        size && `fa-${size}`,
        border && 'fa-border',
        fixedWidth && 'fa-fw',
        flip && `fa-flip-${flip}`,
        spin && `fa-spin`,
        pulse && `fa-pulse`,
        inverse && `fa-inverse`,
        className
    );
    const ariaLabelledBy = title ? randomID() : undefined;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-labelledby={ariaLabelledBy}
            ref={ref}
            role="img"
            viewBox={`0 0 ${width} ${height}`}
            className={svgClassName}
            {...restProps}
        >
            {ariaLabelledBy && <title id={ariaLabelledBy}>{title}</title>}
            <path fill='currentColor' d={vectorData.toString()} />
        </svg>
    );
});

export default FontAwesomeIcon;
