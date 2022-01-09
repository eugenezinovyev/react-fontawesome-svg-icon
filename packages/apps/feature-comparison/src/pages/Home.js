import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import homeContent from './home-content.md?raw';
import CodeHighlight from '../components/CodeHighlight';

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
        <ReactMarkdown components={{ code }} plugins={[ remarkGfm ]} linkTarget="_blank">
            {homeContent}
        </ReactMarkdown>
    );
};

export default Home;
