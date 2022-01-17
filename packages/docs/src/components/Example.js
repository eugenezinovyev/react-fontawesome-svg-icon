import React from 'react';
import { arrayOf, node, oneOfType, string } from 'prop-types';
import clsx from 'clsx';
import classes from './Example.module.css';

const Example = ({ id, className, title, children }) => (
    <div className={clsx(classes.root, className)}>
        <h2 id={id} className={classes.title}>{title}</h2>
        {children}
    </div>
);

Example.propTypes = {
    className: string,
    id: string,
    title: string.isRequired,
    children: oneOfType([ node, arrayOf(node) ]).isRequired,
};

export default Example;
