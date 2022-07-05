import { FunctionComponent, PropsWithChildren } from 'react';
import { arrayOf, element, oneOfType } from 'prop-types';
import classes from './AnchorList.module.css';

const AnchorList: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className={ classes.root }>
        { children }
    </div>
);

AnchorList.propTypes = {
    children: oneOfType([element, arrayOf(element)]),
};

AnchorList.defaultProps = {
    children: null,
};

export default AnchorList;
