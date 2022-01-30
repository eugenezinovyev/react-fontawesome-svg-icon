import { FunctionComponent, HTMLAttributeAnchorTarget } from 'react';

type TransformLinkTarget = (href: string | undefined) => HTMLAttributeAnchorTarget | undefined
const transformLinkTarget: TransformLinkTarget = href => !href || (href.startsWith('#') || href.startsWith(window.location.origin))
    ? undefined
    : '_blank';

const Link: FunctionComponent<JSX.IntrinsicElements['a']> = ({ children, href }) => (
    <a target={ transformLinkTarget(href) } href={ href }>{ children }</a>
);

export default Link;
