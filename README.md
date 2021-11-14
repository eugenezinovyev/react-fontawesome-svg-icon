![build](https://github.com/eugenezinovyev/react-fontawesome-svg-icon/actions/workflows/main.yml/badge.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/eugenezinovyev/react-fontawesome-svg-icon/badge.svg?targetFile=packages%2Freact-fontawesome-svg-icon%2Fpackage.json)](https://snyk.io/test/github/eugenezinovyev/react-fontawesome-svg-icon?targetFile=packages%2Freact-fontawesome-svg-icon%2Fpackage.json)
[![npm version](https://badge.fury.io/js/react-fontawesome-svg-icon.svg)](https://www.npmjs.com/package/react-fontawesome-svg-icon)
[![min](https://badgen.net/bundlephobia/min/react-fontawesome-svg-icon)](https://bundlephobia.com/package/react-fontawesome-svg-icon)
[![minzip](https://badgen.net/bundlephobia/minzip/react-fontawesome-svg-icon)](https://bundlephobia.com/package/react-fontawesome-svg-icon)
[![tree-shaking](https://badgen.net/bundlephobia/tree-shaking/react-fontawesome-svg-icon)](https://bundlephobia.com/package/react-fontawesome-svg-icon)
[![codecov](https://codecov.io/gh/eugenezinovyev/react-fontawesome-svg-icon/branch/main/graph/badge.svg?token=5WGM492AXT)](https://codecov.io/gh/eugenezinovyev/react-fontawesome-svg-icon)

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
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
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

Install `react-fontawesome-svg-icon`, `@fortawesome/fontawesome-svg-core` and required SVG icon packages.

```
npm install --save react-fontawesome-svg-icon @fortawesome/fontawesome-svg-core @fortawesome/free-regular-svg-icons @fortawesome/free-solid-svg-icons
```

```
yarn add react-fontawesome-svg-icon @fortawesome/fontawesome-svg-core @fortawesome/free-regular-svg-icons @fortawesome/free-solid-svg-icons
```

Import `@fortawesome/fontawesome-svg-core/styles.css` into the entry point.

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import '@fortawesome/fontawesome-svg-core/styles.css';
import App from './components/App';

ReactDOM.render(<App />, document.getElementById('root'));

```

# Feature Support

## Icon
* Takes icon object only.
No array option `icon={["fal", "coffee"]}` supported.
* If icon from different set needed, import it from different set: `import { faCoffee } from '@fortawesome/pro-light-svg-icons';`
```tsx
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

const CoffeeIcon = () => <FontAwesomeSvgIcon icon={faCoffee} />;
```

## Icon sizing
```tsx
// type SizeProp = "xs" | "lg" | "sm" | "1x" | "2x" | "3x" | "4x" | "5x" | "6x" | "7x" | "8x" | "9x" | "10x";
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

const CoffeeIcons = () => (
    <>
        <FontAwesomeSvgIcon icon={faCoffee} size="xs" />
        <FontAwesomeSvgIcon icon={faCoffee} size="lg" />
        <FontAwesomeSvgIcon icon={faCoffee} size="5x" />
    </>
);
```

## Styling
```tsx
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

const Icons = () => (
    <>
        <FontAwesomeSvgIcon icon={faCoffee} className="custom-class" />
        <FontAwesomeSvgIcon icon={faCoffee} style={{ backgroundColor: 'red' }} />
        <FontAwesomeSvgIcon icon={faCoffee} color="#fff" />
        <FontAwesomeSvgIcon icon={faCoffee} fixedWidth />
        <FontAwesomeSvgIcon icon={faCoffee} listItem />
        <FontAwesomeSvgIcon icon={faCoffee} inverse />
    </>
);
```

## Bordered
```tsx
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

const CoffeeIcon = () => <FontAwesomeSvgIcon icon={faCoffee} border />;
```

## Pulled Icons
```tsx
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

const Icons = () => (
    <>
        <FontAwesomeSvgIcon icon={faCoffee} pull="left" />
        <FontAwesomeSvgIcon icon={faCoffee} pull="right" />
    </>
);
```

## Swap Opacity
Meaningful for Duotone icons.
```tsx
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

const SwapOpacityIcon = () => <FontAwesomeSvgIcon icon={faCoffee} swapOpacity />;
```

## Rotation & Flip
```tsx
// type RotateProp = 90 | 180 | 270;
// type FlipProp = "horizontal" | "vertical" | "both";
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faSnowboarding } from '@fortawesome/free-solid-svg-icons';

const RotatingIcons = () => (
    <>
        <FontAwesomeSvgIcon icon={faSnowboarding} rotation={90} />
        <FontAwesomeSvgIcon icon={faSnowboarding} rotation={180} />
        <FontAwesomeSvgIcon icon={faSnowboarding} rotation={270} />
        <FontAwesomeSvgIcon icon={faSnowboarding} flip="horizontal" />
        <FontAwesomeSvgIcon icon={faSnowboarding} flip="vertical" />
        <FontAwesomeSvgIcon icon={faSnowboarding} flip="both" />
    </>
);
```

## Animations
```tsx
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

const AnimatedIcons = () => (
    <>
        <FontAwesomeSvgIcon icon={faCoffee} spin />
        <FontAwesomeSvgIcon icon={faCoffee} pulse />
    </>
);
```

## Title
```tsx
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

const CoffeeIcon = () => <FontAwesomeSvgIcon icon={faCoffee} title="Icon Title" />;
```

## Ref Forwarding
Component is wrapped with `React.forwardRef`. The ref passed to the root SVG element.
```tsx
import React, { useRef } from 'react';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

const RefForwarding = () => {
    const ref = useRef();
    
    return (
        <FontAwesomeSvgIcon ref={ref} icon={faCoffee} />
    );
};
```

## Not supported yet
* `symbol` property: [Using SVG Symbols](https://fontawesome.com/how-to-use/on-the-web/advanced/svg-symbols)
* `transform` property: [Power Transforms](https://fontawesome.com/how-to-use/on-the-web/styling/power-transforms)
* `mask` property: [Masking Icons](https://fontawesome.com/how-to-use/on-the-web/styling/masking)

# Bundle comparison

A simple React application with `react-fontawesome-svg-icon` bundle compared to a similar application with `@fortawesome/react-fontawesome` bundle.

## main (-25,058 bytes)

|| Module | Count | Size |
|-|-|-|-|
|+|../../react-fontawesome-svg-icon/lib/index.esm.js|1|+1,603|
|+|css ../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/@fortawesome/fontawesome-svg-core/styles.css|1|+7,891|
|-|../../../node_modules/@fortawesome/react-fontawesome/index.es.js|5|-90,805|
|-|../../../node_modules/@fortawesome/fontawesome-svg-core/index.es.js|1|-76,794|
|-|../../../node_modules/prop-types/index.js|3|-2,645|
|-|webpack/runtime/compat get default export|1|-267|
|-|webpack/runtime/define property getters|1|-308|
|-|webpack/runtime/global|1|-221|
|-|webpack/runtime/hasOwnProperty shorthand|1|-88|
|△|*1 modules with minor changes*| |+58|
