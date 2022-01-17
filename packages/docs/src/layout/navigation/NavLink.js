import React from 'react';
import { arrayOf, node, oneOfType, string } from 'prop-types';
import { NavLink as RouterNavLink } from 'react-router-dom';
import clsx from 'clsx';
import classes from './NavLink.module.css';

const resolveNavLinkClassName = ({ isActive }) => clsx(classes.root, isActive && classes.active);

const NavLink = ({ to, name, children }) => (
    <>
        <RouterNavLink to={to} className={resolveNavLinkClassName}>
            {name}
        </RouterNavLink>
        {children}
    </>
);

NavLink.propTypes = {
    to: string.isRequired,
    name: string.isRequired,
    children: oneOfType([ node, arrayOf(node)]),
};

NavLink.defaultProps = {
    children: null,
};

export default NavLink;
