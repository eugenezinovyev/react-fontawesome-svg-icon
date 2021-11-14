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
