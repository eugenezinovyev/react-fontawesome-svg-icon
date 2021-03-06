import { FunctionComponent } from 'react';
import Example from '../../../components/Example';
import CodeHighlight from '../../../components/CodeHighlight';
import PullExample from './PullExample';
import PullExampleRaw from './PullExample?raw';

const Pull: FunctionComponent = () => (
    <Example id="pull-and-border" title="Pulled & Bordered Icons">
        <PullExample/>
        <CodeHighlight>
            { PullExampleRaw }
        </CodeHighlight>
    </Example>
);

export default Pull;
