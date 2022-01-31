function createBuildGraph(workspacesInfo) {
    let workspaces = Object.keys(workspacesInfo.workspaces);
    const dependencyMap = {};
    workspaces.forEach((workspace) => {
        dependencyMap[workspace] = workspacesInfo.workspaces[workspace].workspaceDependencies;
    });
    const graph = [];

    while (workspaces.length > 0) {
        const takenWorkspaces = workspaces.filter(workspace => dependencyMap[workspace].length === 0);
        takenWorkspaces.forEach((workspace) => {
            delete dependencyMap[workspace];
        });

        graph.push(takenWorkspaces);

        const leftWorkspaces = workspaces.filter(workspace => !takenWorkspaces.includes(workspace));

        leftWorkspaces.forEach((workspace) => {
            dependencyMap[workspace] = dependencyMap[workspace].filter(workspace => !takenWorkspaces.includes(workspace));
        });

        workspaces = leftWorkspaces;
    }

    return graph;
}

export default createBuildGraph;
