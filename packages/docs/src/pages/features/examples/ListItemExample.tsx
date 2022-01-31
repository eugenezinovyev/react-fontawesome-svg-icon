import { VoidFunctionComponent } from 'react';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faCoffee, faHeart } from '@fortawesome/free-solid-svg-icons';

const Example: VoidFunctionComponent = () => (
    <>
        <ul className="fa-ul">
            <li><FontAwesomeSvgIcon icon={ faCoffee } size="lg" listItem/> Coffee</li>
            <li><FontAwesomeSvgIcon icon={ faHeart } size="lg" listItem/> Love</li>
        </ul>
    </>
);

export default Example;
