import spawn from 'cross-spawn';

function spawnAsync(command, args, options = {}) {
    return new Promise((resolve, reject) => {
        const childProcess = spawn(command, args, { cwd: options.cwd, env: process.env });
        childProcess.on('close', function (code) {
            resolve(code);
        });
        childProcess.on('error', function (err) {
            reject(err);
        });
        childProcess.stdout.on('data', (data) => {
            options.onStdout && options.onStdout(data);
        });

        childProcess.stderr.on('data', (data) => {
            options.onStderr && options.onStderr(data);
        });
    });
}

export default spawnAsync;
