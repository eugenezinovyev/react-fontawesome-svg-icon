import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';
import { readFile } from 'fs/promises';
import promptly from 'promptly';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const logger = {
    log(...args) {
        console.log(...args);
    }
};

function execAsync(command) {
    return new Promise((resolve, reject) => {
        exec(command, (err, stdout, stderr) => {
            if (err) {
                reject(err);
                return;
            }

            if (stderr !== '') {
                reject(new Error(stderr));
                return;
            }


            resolve(stdout);
        });

    });
}

function getWorkspacesInfo() {
    return execAsync('yarn workspaces info').then(stdout => JSON.parse(stdout));
}

function setWorkspaceVersion(workspace, version) {
    return execAsync(`yarn workspace ${workspace} version --no-git-tag-version --new-version ${version}`);
}

function packageResolve(path) {
    return resolve(__dirname, '..', path);
}

function readVersion(packagePath) {
    return readFile(join(packageResolve(packagePath), 'package.json'), { encoding: 'utf8' })
        .then(text => JSON.parse(text))
        .then(json => json.version);
}

const currentVersion = await readVersion('.');
const workspacesInfo = await getWorkspacesInfo();
const workspaces = Object.keys(workspacesInfo);

logger.log('Current version is', currentVersion);
await Promise.all(workspaces.map((workspace) => readVersion(workspacesInfo[workspace].location).then(version => ({ workspace, version }))))
    .then(versions => versions.forEach(({ workspace, version }) => {
        logger.log(`  ${workspace} ${version}`);
    }));

const newVersion = await promptly.prompt('New version: ');
await Promise.all([
    ...workspaces.map(workspace => setWorkspaceVersion(workspace, newVersion)),
    execAsync(`yarn version --no-git-tag-version --new-version ${newVersion}`)
]);
