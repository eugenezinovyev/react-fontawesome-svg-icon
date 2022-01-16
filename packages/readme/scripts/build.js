'use strict';

import webpack from 'webpack';
import { gzipSizeSync } from 'gzip-size';
import chalk from 'chalk';
import filesize from 'filesize';
import { basename, dirname, join, resolve, sep } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import bundleComparisonWebpackConfigFactory from '../src/bundle-comparison/webpack.config.js';
import { diff, generateReport } from 'webpack-bundle-diff';
import * as fileConcat from 'concat';

const concat = fileConcat.default;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const colors = [ 'magenta', 'cyan', 'yellow' ];
let colorIndex = 0;
const createLogger = (name) => {
    const color = colors[(colorIndex++ % colors.length)];
    return (...args) => console.log(`${chalk[color](name)}:`, ...args);
};

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

function getFileSizes(webpackStats, buildFolder) {
    return (webpackStats.stats || [ webpackStats ])
        .map((stats) =>
            stats.toJson({ all: false, assets: true }).assets.filter(asset => (/\.(js|css)$/.test(asset.name)))
                .map((asset) => {
                    const fileContents = fs.readFileSync(join(buildFolder, asset.name));
                    const gzipSize = gzipSizeSync(fileContents);

                    return {
                        folder: join(basename(buildFolder), dirname(asset.name)),
                        name: basename(asset.name),
                        size: asset.size,
                        sizeLabel: filesize(asset.size),
                        gzipSize: gzipSize,
                        gzipSizeLabel: filesize(gzipSize),
                    };
                })
        )
        .reduce((single, all) => all.concat(single), [])
        .sort((a, b) => b.size - a.size);
}

function buildApp(app) {
    const log = createLogger(app);// (...args) => console.log(`${chalk.cyan(app)}:`, ...args);

    function runWebpack() {
        const compiler = webpack(bundleComparisonWebpackConfigFactory({
            basePath: resolve(__dirname, '../src/bundle-comparison', app),
            commonPath: resolve(__dirname, '../src/bundle-comparison'),
            entryPath: resolve(__dirname, '../src/bundle-comparison', app, 'index.tsx'),
            outputPath: resolve(__dirname, '../obj', app)
        }));

        return new Promise((resolve, reject) => {
            compiler.run((error, stats) => {
                if (error) {
                    return reject(error);
                }

                log(chalk.green('Compiled successfully.'));

                return resolve(stats);
            });
        });
    }

    function collectFileSizes(stats) {
        const buildPath = resolve(__dirname, '../obj', app);
        const fileSizes = getFileSizes(stats, buildPath);
        log(`Collecting file sizes at ${buildPath} found ${fileSizes.length} files`);

        fileSizes.forEach((asset) => {
            log(`${asset.sizeLabel} (${asset.gzipSizeLabel} gzipped) ${chalk.dim(asset.folder + sep)}${chalk.cyan(asset.name)}`);
        });

        return [stats, fileSizes];
    }

    return runWebpack()
        .then(collectFileSizes)
        .catch((error) => {
            error && error.message && log(error.message);
            process.exit(1);
        });
}

function buildBundleComparison() {
    return Promise.all([ buildApp('baseline'), buildApp('comparison') ])
        .then(([ [ baselineStats1, baselineFileSizes ], [ comparisonStats1, comparisonFileSizes ] ]) => {
            const baselineStats = baselineStats1.toJson();
            const comparisonStats = comparisonStats1.toJson();
            const statsDiff = diff(baselineStats, comparisonStats);
            
            const mdHeading = fs.readFileSync(resolve(__dirname, '../src/bundle-comparison/heading.md'));
            const mdReport = generateReport(statsDiff);

            const data = `${mdHeading}
Baseline:
${baselineFileSizes.map(asset => `* ${asset.name} ${asset.sizeLabel} (${asset.gzipSizeLabel} gzipped)`).join('\n')}

Comparison:
${comparisonFileSizes.map(asset => `* ${asset.name} ${asset.sizeLabel} (${asset.gzipSizeLabel} gzipped)`).join('\n')}

${mdReport}
`;
            const file = resolve(__dirname, '../obj/bundle-comparison.md');
            fs.writeFileSync(file, data, { encoding: 'utf8' });
            
            return file;
        });
}

fs.rmSync(resolve(__dirname, '../obj'), { force: true, recursive: true });
fs.rmSync(resolve(__dirname, '../dist'), { force: true, recursive: true });
buildBundleComparison()
    .then(bundleComparisonFile => {
        fs.mkdirSync(resolve(__dirname, '../dist'));
        
        return concat([
            resolve(__dirname, '../src/badges.md'),
            resolve(__dirname, '../src/disclaimer.md'),
            resolve(__dirname, '../src/motivation.md'),
            resolve(__dirname, '../src/demo.md'),
            resolve(__dirname, '../src/how.md'),
            resolve(__dirname, '../src/installation.md'),
            resolve(__dirname, '../src/features.md'),
            bundleComparisonFile,
        ], resolve(__dirname, '../dist/README.md'));
    });

    