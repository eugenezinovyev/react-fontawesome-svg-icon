import { copyFile } from 'fs/promises';
import packageResolve from './package-resolve.js';

await Promise.all([
    copyFile(packageResolve('packages/readme/dist/README.md'), packageResolve('packages/react-fontawesome-svg-icon/README.md')),
    copyFile(packageResolve('packages/readme/dist/README.md'), packageResolve('./README.md')),
]);
