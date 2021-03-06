import { FunctionComponent } from 'react';
import Example from '../../../components/Example';
import CodeHighlight from '../../../components/CodeHighlight';
import FixedWidthExample from './FixedWidthExample';
import FixedWidthExampleRaw from './FixedWidthExample?raw';

const FixedWidth: FunctionComponent = () => (
    <Example id="fixed-width" title="Fixed Width Icons">
        <FixedWidthExample/>
        <CodeHighlight>
            { FixedWidthExampleRaw }
        </CodeHighlight>
    </Example>
);

export default FixedWidth;
