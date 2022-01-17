import React from 'react';
import { Outlet } from 'react-router-dom';
import Container from './Container';
import Heading from './Heading';
import Navigation from './navigation/Navigation';
import icon from '../../../../icon.svg';

import classes from './Layout.module.css';

const Layout = () => (
    <div className={classes.root}>
        <div className={classes.navBarOutlet}>
            <div className={classes.navBar}>
                <div className={classes.iconContainer}>
                    <img width={64} height={64} className={classes.icon} src={icon} alt="icon" />
                </div>
                <p className={classes.packageTitle}>react-fontawesome-svg-icon</p>
                <Navigation />
            </div>
        </div>
        <Container>
            <Heading />
            <Outlet/>
        </Container>
    </div>
);

export default Layout;
