import collectWorkspaceInfo from './collect-workspace-info.js';
import createBuildGraph from './create-build-graph.js';
import spawnAsync from './spawn-async.js';
import createLogger from './create-logger.js';

const args = process.argv.slice(2);
const requestedScript = args[0];
const workspaceInfo = await collectWorkspaceInfo();
const buildGraph = createBuildGraph(workspaceInfo);

function hasScript(workspace, script) {
    return workspaceInfo.workspaces[workspace].scripts.includes(script);
}

function doLogs(data, logLine) {
    const stringData = String(data);
    stringData.split('\n').filter(Boolean).forEach(line => logLine(line));
}

function runScript(workspace, script, logger) {
    const info = workspaceInfo.workspaces[workspace];

    return spawnAsync('yarn', [script], {
        cwd: info.location,
        onStdout: (data) => {
            doLogs(data, line => logger.log(line));
        },
        onStderr: (data) => {
            doLogs(data, line => logger.error(line));
        },
    });
}

for (let i = 0; i < buildGraph.length; i++) {
    await Promise.all(buildGraph[i].filter(workspace => hasScript(workspace, requestedScript)).map(async workspace => {
        const logger = createLogger(workspace);
        await runScript(workspace, requestedScript, logger);
    }));
}
