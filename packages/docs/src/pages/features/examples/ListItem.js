import React from 'react';
import Example from '../../../components/Example';
import CodeHighlight from '../../../components/CodeHighlight';
import ListItemExample from './ListItemExample';
import ListItemExampleRaw from './ListItemExample?raw';

const ListItem = () => (
    <Example id="list-item" title="List Item Icons">
        <ListItemExample />
        <CodeHighlight>
            {ListItemExampleRaw}
        </CodeHighlight>
    </Example>
);

export default ListItem;
