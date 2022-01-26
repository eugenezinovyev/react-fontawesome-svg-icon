import promptly from 'promptly';
import execAsync from './exec-async.js';
import collectWorkspaceInfo from './collect-workspace-info.js';

const workspaceInfo = await collectWorkspaceInfo();
const workspaces = Object.keys(workspaceInfo.workspaces);

console.log('Current version is', workspaceInfo.version);
workspaces.forEach((workspace) => {
    console.log(`  ${workspace} ${workspaceInfo.workspaces[workspace].version}`);
});

const newVersion = await promptly.prompt('New version: ');
await Promise.all([
    ...workspaces.map(workspace => execAsync(`yarn workspace ${workspace} version --no-git-tag-version --new-version ${newVersion}`)),
    execAsync(`yarn version --no-git-tag-version --new-version ${newVersion}`)
]);
