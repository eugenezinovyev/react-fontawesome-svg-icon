import { exec } from 'child_process';

function execAsync(command, options = {}) {
    return new Promise((resolve, reject) => {
        exec(command, { cwd: options.cwd }, (err, stdout, stderr) => {
            if (err) {
                options.logger && options.logger.error(err);
                reject(err);
                return;
            }

            if (stderr !== '') {
                options.logger && options.logger.error(stderr);
                reject(new Error(stderr));
                return;
            }

            options.logger && options.logger.log(stdout);
            resolve(stdout);
        });

    });
}

export default execAsync;
