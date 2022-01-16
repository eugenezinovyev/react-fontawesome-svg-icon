import React from 'react';
import { arrayOf, node, oneOfType } from 'prop-types';
import classes from './AnchorList.module.css';

const AnchorList = ({ children }) => (
    <div className={classes.root}>
        {children}
    </div>
);

AnchorList.propTypes = {
    children: oneOfType([ node, arrayOf(node)]),
};

AnchorList.defaultProps = {
    children: null,
};

export default AnchorList;
