import { FunctionComponent, PropsWithChildren, useEffect, useRef } from 'react';
import { string } from 'prop-types';
import Prism from 'prismjs';
import classes from './CodeHighlight.module.css';

export type CodeHighlightProps = PropsWithChildren<{ language?: string }>;

const CodeHighlight: FunctionComponent<CodeHighlightProps> = ({ children, language }) => {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        if (ref.current) {
            Prism.highlightElement(ref.current);
        }
    }, [children]);

    return (
        <div className={ classes.root }>
            <pre>
                <code ref={ ref } className={ `language-${ language }` }>{ children }</code>
            </pre>
        </div>
    );
};

CodeHighlight.propTypes = {
    children: string.isRequired,
    language: string,
};

CodeHighlight.defaultProps = {
    language: 'tsx',
};

export default CodeHighlight;
