import { Children, FunctionComponent, ReactElement, ReactNode } from 'react';
import { WithNode } from './WithNode';

type FlattenFn = (text: string, child: string | ReactElement) => string;
type CodeChildrenReducer = (child: ReactNode | ReactNode[], aggregate: string) => string;
type ReduceChildren = (children: ReactNode | ReactNode[], reducer: CodeChildrenReducer, aggregate: string) => string;

const c2a = Children.toArray;
const reduceChildren: ReduceChildren = (children, reducer, aggregate) => c2a(children).reduce<string>(reducer, aggregate);
const flatten: FlattenFn = (text, child) => typeof child === 'string' ? text + child : reduceChildren(child.props.children, flatten, text);

const Heading1: FunctionComponent<WithNode & JSX.IntrinsicElements['h1']> = ({ children }) => (
    <h1 id={c2a(children).reduce<string>(flatten, '').toLowerCase().replace(/\W/g, '-')}>{children}</h1>
);

export default Heading1;