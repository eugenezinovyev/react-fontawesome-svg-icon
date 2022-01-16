import React, { Children, createElement } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import homeContent from '@react-fontawesome-svg-icon/readme?raw';
import CodeHighlight from '../../components/CodeHighlight';

const transformLinkTarget = href => href.startsWith('#') || href.startsWith(window.location.origin) ? undefined : '_blank';

function flatten(text, child) {
    return typeof child === 'string'
        ? text + child
        : Children.toArray(child.props.children).reduce(flatten, text);
}

function heading({ node, level, children, ...props }) {
    return createElement(`h${level}`, { ...props, id: Children.toArray(children).reduce(flatten, '').toLowerCase().replace(/\W/g, '-') }, children);
}

function code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : 'shell';

    if (inline) {
        return <code className={className} {...props}>{children}</code>;
    } else {
        return <CodeHighlight language={language}>{children}</CodeHighlight>;
    }
}

const Home = () => {
    return (
        <ReactMarkdown components={{ code, h1: heading }} plugins={[ remarkGfm ]} linkTarget={transformLinkTarget}>
            {homeContent}
        </ReactMarkdown>
    );
};

export default Home;
