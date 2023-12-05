const createGraph = require('./lib/graph').create;

module.exports = {
	create,
};

/**
 * @param {import('./').CreateParams} params
 */
function create({graphNodes, graphEdges}) {
	const graph = createGraph(graphNodes, graphEdges);

}