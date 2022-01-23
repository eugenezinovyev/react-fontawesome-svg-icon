import { FunctionComponent, PropsWithChildren } from 'react';
import { string } from 'prop-types';
import { HashLink } from 'react-router-hash-link';
import classes from './Anchor.module.css';

export type AnchorProps = PropsWithChildren<{ to: string }>;

const Anchor: FunctionComponent<AnchorProps> = ({ to, children }) => (
    <HashLink to={ to } className={ classes.root }>
        { children }
    </HashLink>
);

Anchor.propTypes = {
    to: string.isRequired,
    children: string.isRequired,
};

export default Anchor;
