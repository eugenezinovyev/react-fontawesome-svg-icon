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
