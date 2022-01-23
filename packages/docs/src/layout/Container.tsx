import { FunctionComponent } from 'react';
import { arrayOf, node, oneOfType } from 'prop-types';
import classes from './Container.module.css';

const Container: FunctionComponent = ({ children }) => (
    <div className={ classes.root }>
        { children }
    </div>
);

Container.propTypes = {
    children: oneOfType([node, arrayOf(node)]),
};

export default Container;
