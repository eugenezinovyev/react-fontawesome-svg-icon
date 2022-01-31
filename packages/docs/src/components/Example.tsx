import { FunctionComponent, PropsWithChildren } from 'react';
import { arrayOf, node, oneOfType, string } from 'prop-types';
import clsx from 'clsx';
import classes from './Example.module.css';

export type ExampleProps = PropsWithChildren<{ id: string, className?: string, title: string }>;

const Example: FunctionComponent<ExampleProps> = ({ id, className, title, children }) => (
    <div className={ clsx(classes.root, className) }>
        <h2 id={ id } className={ classes.title }>{ title }</h2>
        { children }
    </div>
);

Example.propTypes = {
    className: string,
    id: string.isRequired,
    title: string.isRequired,
    children: oneOfType([node, arrayOf(node)]).isRequired,
};

export default Example;
