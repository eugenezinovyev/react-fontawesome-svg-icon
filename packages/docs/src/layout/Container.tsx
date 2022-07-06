import { FunctionComponent, PropsWithChildren } from 'react';
import { arrayOf, element, oneOfType } from 'prop-types';
import classes from './Container.module.css';

const Container: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className={ classes.root }>
        { children }
    </div>
);

Container.propTypes = {
    children: oneOfType([element, arrayOf(element)]),
};

export default Container;
