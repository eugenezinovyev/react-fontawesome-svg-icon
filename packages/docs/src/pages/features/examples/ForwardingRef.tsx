import { FunctionComponent } from 'react';
import Example from '../../../components/Example';
import CodeHighlight from '../../../components/CodeHighlight';
import ForwardingRefExample from './ForwardingRefExample';
import ForwardingRefExampleRaw from './ForwardingRefExample?raw';

const ForwardingRef: FunctionComponent = () => (
    <Example id="ref-forwarding" title="Forwarding Ref">
        <ForwardingRefExample/>
        <CodeHighlight>
            { ForwardingRefExampleRaw }
        </CodeHighlight>
    </Example>
);

export default ForwardingRef;