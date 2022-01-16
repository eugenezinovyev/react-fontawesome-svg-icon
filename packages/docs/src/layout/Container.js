import React from 'react';
import { arrayOf, node, oneOfType } from 'prop-types';
import classes from './Container.module.css';

const Container = ({ children }) => {
    return (
        <div className={classes.root}>
            {children}
        </div>
    );
};

Container.propTypes = {
    children: oneOfType([ node, arrayOf(node)]),
};

export default Container;
