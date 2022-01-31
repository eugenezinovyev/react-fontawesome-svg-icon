import chalk from 'chalk';

const colors = [
    'blue',
    'magenta',
    'cyan',
    'white',
    'redBright',
    'greenBright',
    'yellowBright',
    'blueBright',
    'magentaBright',
    'cyanBright',
    'whiteBright',
];
let colorIndex = 0;

function createLogger(name) {
    const color = colors[colorIndex];
    colorIndex++;

    return {
        log(...args) {
            console.log(chalk[color](name), ...args);
        },
        error(...args) {
            console.error(chalk[color](name), ...args);
        }
    };
}

export default createLogger;
