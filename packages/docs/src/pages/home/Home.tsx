import { Children, createElement, ReactElement, ReactNode, VoidFunctionComponent } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import { PluggableList } from 'unified';
import { TransformLinkTarget } from 'react-markdown/lib/ast-to-react';
import remarkGfm from 'remark-gfm';
import homeContent from '@react-fontawesome-svg-icon/readme?raw';
import CodeHighlight from '../../components/CodeHighlight';

type FlattenFn = (text: string, child: string | ReactElement) => string;
type CodeChildrenReducer = (child: ReactNode | ReactNode[], aggregate: string) => string;
type ReduceChildren = (children: ReactNode | ReactNode[], reducer: CodeChildrenReducer, aggregate: string) => string;

const c2a = Children.toArray;
const transformLinkTarget: TransformLinkTarget = href => href.startsWith('#') || href.startsWith(window.location.origin) ? undefined : '_blank';
const reduceChildren: ReduceChildren = (children, reducer, aggregate) => c2a(children).reduce<string>(reducer, aggregate);
const flatten: FlattenFn = (text, child) => typeof child === 'string' ? text + child : reduceChildren(child.props.children, flatten, text);

const components: Components = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    code: function ({ node, inline, className, children, ...props }) {
        const match = /language-(\w+)/.exec(className || '');
        const language = match ? match[1] : 'shell';

        if (inline) {
            return <code className={ className } { ...props }>{ children }</code>;
        } else {
            return <CodeHighlight language={ language }>{ children }</CodeHighlight>;
        }
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    h1({ node, level, children, ...props }) {
        return createElement(`h${ level }`, {
            ...props,
            id: c2a(children).reduce<string>(flatten, '').toLowerCase().replace(/\W/g, '-'),
        }, children);
    },
};
const plugins: PluggableList = [remarkGfm];

const Home: VoidFunctionComponent = () => (
    <ReactMarkdown components={ components } remarkPlugins={ plugins } linkTarget={ transformLinkTarget }>
        { homeContent }
    </ReactMarkdown>
);

export default Home;
