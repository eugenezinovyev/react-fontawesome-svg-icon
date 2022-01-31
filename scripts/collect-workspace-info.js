import execAsync from './exec-async.js';
import { readFile } from 'fs/promises';
import { join } from 'path';
import packageResolve from './package-resolve.js';

function cleanupJSONLeft(jsonString) {
    return jsonString.replace(/^[^{]*/, '');
}

function getWorkspacesInfo() {
    return execAsync('yarn workspaces info').then(stdout => JSON.parse(cleanupJSONLeft(stdout)));
}

function readPackageJson(packagePath) {
    return readFile(join(packageResolve(packagePath), 'package.json'), { encoding: 'utf8' })
        .then(text => JSON.parse(text));
}

async function collectWorkspaceInfo() {
    const rootPackageJson = await readPackageJson('./');
    const workspacesInfo = await getWorkspacesInfo();
    const info = {
        location: packageResolve('./'),
        version: rootPackageJson.version,
        scripts: Object.keys(rootPackageJson.scripts),
        packageJson: rootPackageJson,
        workspaces: {},
    };

    await Promise.all(Object.keys(workspacesInfo)
        .map((workspace) => ({ workspace, location: workspacesInfo[workspace].location }))
        .map(async ({ workspace, location }) => ({ workspace, location, packageJson: await readPackageJson(location) }))
    ).then(packageJsonCollection => packageJsonCollection.forEach(({ workspace, location, packageJson }) => {
        info.workspaces[workspace] = {
            location: packageResolve(location),
            version: packageJson.version,
            scripts: Object.keys(packageJson.scripts),
            packageJson,
            workspaceDependencies: workspacesInfo[workspace].workspaceDependencies,
            mismatchedWorkspaceDependencies: workspacesInfo[workspace].mismatchedWorkspaceDependencies,
        };
    }));
    
    return info;
}

export default collectWorkspaceInfo;
