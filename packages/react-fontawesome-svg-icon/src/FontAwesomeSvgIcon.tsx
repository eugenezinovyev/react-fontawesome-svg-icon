import {
    Fragment,
    createElement,
    CSSProperties,
    ForwardedRef,
    forwardRef,
    ForwardRefRenderFunction,
    SVGAttributes,
} from 'react';
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
    /** Swap icon opacity. Check FontAwesome documentation for Duotone icons Swapping Layer Opacity. */
    swapOpacity?: boolean;
    /** Rotate icon. Check FontAwesome icon rotation documentation. */
    rotation?: RotateProp,
    /** Render icon as symbol. Accepts boolean or string value.
     * True value generates symbol ID from prefix and icon name.
     * String value directly defines symbol ID.
     */
    symbol?: boolean | string,
}

const clsx = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');
const randomId = (): string => Math.random().toString(36).substr(2);
const omit = (object: object, properties: string[]): object => {
    const result = {};

    for (const key in object) {
        if (Object.hasOwnProperty.call(object, key) && !properties.includes(key)) {
            result[key] = object[key];
        }
    }

    return result;
};

const buildClassName = (props: FontAwesomeSvgIconProps) => clsx(
    'svg-inline--fa',
    `fa-${ (props.icon.iconName) }`,
    `fa-w-${ Math.ceil(props.icon.icon[0] / props.icon.icon[1] * 16) }`,
    props.size && `fa-${ (props.size) }`,
    props.border && 'fa-border',
    props.fixedWidth && 'fa-fw',
    props.flip && `fa-flip-${ (props.flip) }`,
    props.spin && 'fa-spin',
    props.pulse && 'fa-pulse',
    props.inverse && 'fa-inverse',
    props.listItem && 'fa-li',
    props.pull && `fa-pull-${ (props.pull) }`,
    props.swapOpacity && 'fa-swap-opacity',
    props.rotation && `fa-rotate-${ (props.rotation) }`,
    props.className,
);

const customProperties = [
    'icon',
    'size',
    'className',
    'title',
    'border',
    'fixedWidth',
    'flip',
    'spin',
    'pulse',
    'inverse',
    'listItem',
    'pull',
    'swapOpacity',
    'rotation',
    'role',
    'symbol',
];

type FontAwesomeSvgIconRenderFunction = ForwardRefRenderFunction<SVGSVGElement, FontAwesomeSvgIconProps>;
type SvgProps = SVGAttributes<SVGSVGElement> & { ref: ForwardedRef<SVGSVGElement> };

const displayNoneStyle = { style: { display: 'none' } };
const renderFunction: FontAwesomeSvgIconRenderFunction = (props: FontAwesomeSvgIconProps, ref: ForwardedRef<SVGSVGElement>): JSX.Element | null => {
    const icon = props.icon;
    
    if (!icon) {
        return null;
    }

    const { icon: [width, height, , , vectorData] } = icon;
    const ariaLabelledBy: string | undefined = props.title ? randomId() : undefined;
    const svgProps: SvgProps = omit(props, customProperties) as SvgProps;
    svgProps.className = buildClassName(props);
    svgProps.xmlns = 'http://www.w3.org/2000/svg';
    svgProps['aria-labelledby'] = ariaLabelledBy;
    svgProps['aria-hidden'] = ariaLabelledBy ? undefined : true;
    svgProps.focusable = ariaLabelledBy ? undefined : false;
    svgProps.ref = ref;
    svgProps.viewBox = `0 0 ${ width } ${ height }`;
    svgProps.role = props.role || 'img';

    const symbol = props.symbol || false;
    const children = createElement(Fragment, null,
        ariaLabelledBy && createElement('title', { id: ariaLabelledBy }, props.title),
        createElement('path', { fill: 'currentColor', d: vectorData.toString() }));

    if (symbol) {
        svgProps.id = symbol === true ? `${ icon.prefix }-${ icon.iconName }` : symbol;
        
        return createElement('svg', displayNoneStyle, createElement('symbol', svgProps, children));
    }

    return createElement('svg', svgProps, children);
};

/**
 * FontAwesome SVG icon component.
 * */
export const FontAwesomeSvgIcon = forwardRef<SVGSVGElement, FontAwesomeSvgIconProps>(renderFunction);

FontAwesomeSvgIcon.displayName = 'FontAwesomeSvgIcon';
