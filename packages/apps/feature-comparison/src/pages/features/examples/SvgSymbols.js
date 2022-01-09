import React from 'react';
import Example from '../../../components/Example';
import SvgSymbolsExample from './SvgSymbolsExample';
import SvgSymbolsExampleRaw from './SvgSymbolsExample?raw';
import CodeHighlight from '../../../components/CodeHighlight';

const SvgSymbols = () => {
    return (
        <Example id="svg-symbols" title="SVG Symbols">
            <SvgSymbolsExample />
            <CodeHighlight>{SvgSymbolsExampleRaw}</CodeHighlight>
        </Example>
    );
};

export default SvgSymbols;
