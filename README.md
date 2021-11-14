![build](https://github.com/eugenezinovyev/react-fontawesome-icon/actions/workflows/main.yml/badge.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/eugenezinovyev/react-fontawesome-icon/badge.svg?targetFile=packages%2Freact-fontawesome-icon%2Fpackage.json)](https://snyk.io/test/github/eugenezinovyev/react-fontawesome-icon?targetFile=packages%2Freact-fontawesome-icon%2Fpackage.json)
[![npm version](https://badge.fury.io/js/react-fontawesome-icon.svg)](https://www.npmjs.com/package/react-fontawesome-icon)
[![min](https://badgen.net/bundlephobia/min/react-fontawesome-icon)](https://bundlephobia.com/package/react-fontawesome-icon)
[![minzip](https://badgen.net/bundlephobia/minzip/react-fontawesome-icon)](https://bundlephobia.com/package/react-fontawesome-icon)
[![tree-shaking](https://badgen.net/bundlephobia/tree-shaking/react-fontawesome-icon)](https://bundlephobia.com/package/react-fontawesome-icon)

# Disclaimer

This package exists to let bundle size be smaller. This is not an official package.
If you are looking for an official one, please, check here: [react-fontawesome](https://www.npmjs.com/package/react-fontawesome)
# Motivation

I regularly need Font Awesome SVG icon to be used in personal projects.
Unfortunately, existing [react-fontawesome](https://www.npmjs.com/package/react-fontawesome) brings the whole [@fortawesome/font awesome-svg-core](https://www.npmjs.com/package/@fortawesome/fontawesome-svg-core) into my bundles.
It seems to happen because of the way @fortawesome/font awesome-svg-core package bundled.

# How it works

The package uses icon vector data provided by Fontawesome SVG packages (e.g. `@fortawesome/free-solid-svg-icons` or `@fortawesome/free-regular-svg-icons`)
and styles from `@fortawesome/fontawesome-svg-core`.

It is important to include styles from `@fortawesome/fontawesome-svg-core` to the bundle to make it work.
Check [installation section](#installation) to more details.

## Example

```tsx
import React from 'react';
import { FontAwesomeSvgIcon } from 'react-fontawesome-icon';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

const App = () => (
    <FontAwesomeSvgIcon icon={faCoffee} />
);

export default App;
```

Resulting HTML

```html
<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 640 512" class="svg-inline--fa fa-coffee fa-w-20 fa-lg">
    <path fill="currentColor" d="M192 384h192c53 0 96-43 96-96h32c70.6 0 128-57.4 128-128S582.6 32 512 32H120c-13.3 0-24 10.7-24 24v232c0 53 43 96 96 96zM512 96c35.3 0 64 28.7 64 64s-28.7 64-64 64h-32V96h32zm47.7 384H48.3c-47.6 0-61-64-36-64h583.3c25 0 11.8 64-35.9 64z">
    </path>
</svg>
```

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

# Bundle comparison

A simple React application with `react-fontawesome-icon` bundle compared to a similar application with `@fortawesome/react-fontawesome` bundle.

## main (-25,442 bytes)

|| Module | Count | Size |
|-|-|-|-|
|+|../../react-fontawesome-icon/lib/esm/index.js|2|+1,942|
|+|../../react-fontawesome-icon/lib/esm/FontAwesomeSvgIcon.js|1|+1,882|
|+|css ../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/@fortawesome/fontawesome-svg-core/styles.css|1|+7,891|
|-|../../../node_modules/@fortawesome/react-fontawesome/index.es.js|5|-90,805|
|-|../../../node_modules/@fortawesome/fontawesome-svg-core/index.es.js|1|-76,794|
|-|../../../node_modules/prop-types/index.js|3|-2,645|
|-|webpack/runtime/compat get default export|1|-267|
|-|webpack/runtime/define property getters|1|-308|
|-|webpack/runtime/global|1|-221|
|-|webpack/runtime/hasOwnProperty shorthand|1|-88|
|△|*1 modules with minor changes*| |+54|
