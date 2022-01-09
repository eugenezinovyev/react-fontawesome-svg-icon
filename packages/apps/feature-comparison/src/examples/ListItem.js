import React from 'react';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faCoffee, faHeart } from '@fortawesome/free-solid-svg-icons';
import Example from '../components/Example';
import CodeHighlight from '../components/CodeHighlight';

const code = `import React from 'react';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faCoffee } '@fortawesome/free-solid-svg-icons';

const Example = () => (
    <ul className="fa-ul">
        <li><FontAwesomeSvgIcon icon={faCoffee} size="lg" listItem/> Coffee</li>
        <li><FontAwesomeSvgIcon icon={faHeart} size="lg" listItem/> Love</li>
    </ul>
);

export default Example;`;

const ListItem = () => (
    <Example id="list-item" title="List Item Icons">
        <ul className="fa-ul">
            <li><FontAwesomeSvgIcon icon={faCoffee} size="lg" listItem/> Coffee</li>
            <li><FontAwesomeSvgIcon icon={faHeart} size="lg" listItem/> Love</li>
        </ul>
        <CodeHighlight>
            {code}
        </CodeHighlight>
    </Example>
);

export default ListItem;
