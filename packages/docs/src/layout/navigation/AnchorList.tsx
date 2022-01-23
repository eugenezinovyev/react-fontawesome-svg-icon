import { FunctionComponent } from 'react';
import { arrayOf, node, oneOfType } from 'prop-types';
import classes from './AnchorList.module.css';

const AnchorList: FunctionComponent = ({ children }) => (
    <div className={ classes.root }>
        { children }
    </div>
);

AnchorList.propTypes = {
    children: oneOfType([node, arrayOf(node)]),
};

AnchorList.defaultProps = {
    children: null,
};

export default AnchorList;
