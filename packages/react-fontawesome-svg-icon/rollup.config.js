import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import cleanup from 'rollup-plugin-cleanup';
import { terser } from 'rollup-plugin-terser';
import { resolve } from 'path';
import packageJson from './package.json';

const basePath = resolve(__dirname);

export default {
    input: resolve(basePath, 'src/index.ts'),
    output: [
        {
            file: resolve(basePath, packageJson.main),
            format: 'cjs',
            sourcemap: true
        },
        {
            file: resolve(basePath, packageJson.module),
            format: 'esm',
            sourcemap: true
        }
    ],
    plugins: [
        peerDepsExternal(),
        nodeResolve(),
        commonjs(),
        typescript({ cwd: basePath, useTsconfigDeclarationDir: true }),
        terser({ format: { comments: false } }),
        cleanup(),
    ]
};
