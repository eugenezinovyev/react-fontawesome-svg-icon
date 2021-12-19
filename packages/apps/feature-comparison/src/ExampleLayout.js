import classes from './ExampleLayout.module.css';
import React from 'react';
import { arrayOf, node, oneOfType, string } from 'prop-types';

const ExampleLayout = ({ className, title, children }) => (
    <div className={[ classes.root, className ].filter(Boolean).join(' ')}>
        <h3>{title}</h3>
        {children}
    </div>
);

ExampleLayout.propTypes = {
    className: string,
    title: string.isRequired,
    children: oneOfType([ node, arrayOf(node) ]).isRequired,
};

export default ExampleLayout;
