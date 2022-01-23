import { VoidFunctionComponent } from 'react';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faGithub, faNpm } from '@fortawesome/free-brands-svg-icons';
import classes from './Heading.module.css';

const Heading: VoidFunctionComponent = () => (
    <header className={ classes.root }>
        <h1 className={ classes.title }>React FontAwesome SVG Icon</h1>
        <div className={ classes.links }>
            <a rel="noreferrer" target="_blank" className={ classes.npm } href="https://www.npmjs.com/package/react-fontawesome-svg-icon">
                <FontAwesomeSvgIcon icon={ faNpm }/>
            </a>
            <a rel="noreferrer" target="_blank" className={ classes.github } href="https://github.com/eugenezinovyev/react-fontawesome-svg-icon">
                <FontAwesomeSvgIcon icon={ faGithub }/>
            </a>
        </div>
    </header>
);

export default Heading;
