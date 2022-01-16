import React, { useEffect, useRef } from 'react';
import { string, oneOfType, arrayOf } from 'prop-types';
import Prism from 'prismjs';
import classes from './CodeHighlight.module.css';

const CodeHighlight = ({ children, language }) => {
    const ref = useRef();

    useEffect(() => {
        Prism.highlightElement(ref.current);
    }, [children]);

    return (
        <div className={classes.root}>
            <pre>
                <code ref={ref} className={`language-${language}`}>{children}</code>
            </pre>
        </div>
    );
};

CodeHighlight.propTypes = {
    children: oneOfType([string, arrayOf(string)]).isRequired,
    language: string,
};

CodeHighlight.defaultProps = {
    language: 'jsx'
};

export default CodeHighlight;
