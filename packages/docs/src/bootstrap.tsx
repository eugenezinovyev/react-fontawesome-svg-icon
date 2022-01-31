import { render } from 'react-dom';
import '@fortawesome/fontawesome-svg-core/styles.css';
import './index.css';
import App from './App';
import Prism from 'prismjs';

Prism.manual = true;

render(<App/>, document.getElementById('root'));