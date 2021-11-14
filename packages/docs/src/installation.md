# Installation

Install `react-fontawesome-icon`, `@fortawesome/fontawesome-svg-core` and required SVG icon packages.

```
npm install --save react-fontawesome-icon @fortawesome/fontawesome-svg-core @fortawesome/free-regular-svg-icons @fortawesome/free-solid-svg-icons
```

```
yarn add react-fontawesome-icon @fortawesome/fontawesome-svg-core @fortawesome/free-regular-svg-icons @fortawesome/free-solid-svg-icons
```

Import `@fortawesome/fontawesome-svg-core/styles.css` into the entry point.

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import '@fortawesome/fontawesome-svg-core/styles.css';
import App from './components/App';

ReactDOM.render(<App />, document.getElementById('root'));

```
