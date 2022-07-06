import { createRoot } from 'react-dom/client';
import '@fortawesome/fontawesome-svg-core/styles.css';
import './index.css';
import App from './App';
import Prism from 'prismjs';

Prism.manual = true;

const rootDomElement = document.getElementById('root');

if (rootDomElement) {
    const root = createRoot(rootDomElement);
    root.render(<App/>);
}
