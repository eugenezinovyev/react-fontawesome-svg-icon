import React from 'react';
import { elementType } from 'prop-types';
import { faCoffee, faHeart } from '@fortawesome/free-solid-svg-icons';
import ExampleLayout from './ExampleLayout';

const ListItemExample = ({ component: Component }) => (
    <ExampleLayout title="List Item">
        <ul className="fa-ul">
            <li><Component icon={faCoffee} size="lg" listItem/> Coffee</li>
            <li><Component icon={faHeart} size="lg" listItem/> Love</li>
        </ul>
    </ExampleLayout>
);

ListItemExample.propTypes = {
    component: elementType,
};

export default ListItemExample;
