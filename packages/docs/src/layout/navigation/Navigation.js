import React from 'react';
import NavLink from './NavLink';
import Anchor from './Anchor';
import AnchorList from './AnchorList';
import classes from './Navigation.module.css';

const Navigation = () => (
    <nav className={classes.root}>
        <NavLink to="/" name="Home"/>
        <NavLink to="/features" name="Features">
            <AnchorList>
                <Anchor to="/features#families">Icon Families</Anchor>
                <Anchor to="/features#sizes">Sizing Icons</Anchor>
                <Anchor to="/features#title">Icon Title</Anchor>
                <Anchor to="/features#styling">Custom Styles & Color</Anchor>
                <Anchor to="/features#fixed-width">Fixed Width Icons</Anchor>
                <Anchor to="/features#flip">Flipped Icons</Anchor>
                <Anchor to="/features#animation">Animation: Spin & Pulse</Anchor>
                <Anchor to="/features#rotation">Rotate Icons</Anchor>
                <Anchor to="/features#inverse">Inverse Color</Anchor>
                <Anchor to="/features#list-item">List Item Icons</Anchor>
                <Anchor to="/features#pull-and-border">Pulled & Bordered Icons</Anchor>
                <Anchor to="/features#tab-index">Tab Index</Anchor>
                <Anchor to="/features#swap-opacity">Swap Opacity</Anchor>
                <Anchor to="/features#ref-forwarding">Forwarding Ref</Anchor>
                <Anchor to="/features#svg-symbols">SVG Symbols</Anchor>
            </AnchorList>
        </NavLink>
    </nav>
);

export default Navigation;
