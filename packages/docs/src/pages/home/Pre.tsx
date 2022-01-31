import { FunctionComponent } from 'react';
import { Element, Text } from 'hast';
import CodeHighlight from '../../components/CodeHighlight';
import { WithNode } from './WithNode';

const Pre: FunctionComponent<WithNode & JSX.IntrinsicElements['pre']> = ({ node: { children: [codeContent] } }) => {
    const code = codeContent as Element;
    const [className] = (code.properties?.className || []) as string[];
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : 'shell';
    const [{ value: text }] = code.children as Text[];

    return (
        <div>
            <CodeHighlight language={ language }>{ text }</CodeHighlight>
        </div>
    );
};

export default Pre;
