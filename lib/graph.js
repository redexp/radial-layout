module.exports = {
	create
};

/**
 * @param {import('./graph').Node[]} nodes
 * @param {import('./graph').Edge[]} [edges]
 */
function create(nodes, edges = []) {
	/** @type {Map<import('./graph').ID, import('./graph').Graph>} */
	const graph = new Map();

	/** @type {Map<import('./graph').ID, import('./graph').Graph[]>} */
	const pending = new Map();

	/** @type {Array<[import('./graph').ID | null, import('./graph').Node[]]>} */
	const nodesList = [[null, nodes]];

	for (const [pid, nodes] of nodesList) for (const node of nodes) {
		if (!node.id) {
			throw new Error(`Graph node id prop is required`);
		}

		if (graph.has(node.id)) {
			throw new Error(`Graph node ${JSON.stringify(node.id)} duplication`);
		}

		const {parentId = pid, children} = node;

		const clone = {
			...node,
			id: node.id,
			parentId: parentId || null,
			children: [],
		};

		graph.set(node.id, clone);

		if (parentId) {
			if (graph.has(parentId)) {
				graph.get(parentId).children.push(clone);
			}
			else {
				if (!pending.has(parentId)) {
					pending.set(parentId, []);
				}

				pending.get(parentId).push(clone);
			}
		}

		if (children) {
			nodesList.push([node.id, children]);
		}

		if (pending.has(node.id)) {
			clone.children = pending.get(node.id);
			pending.delete(node.id);
		}
	}

	for (const {source: s, target: t} of edges) {
		if (!graph.has(s)) {
			throw new Error(`Undefined edge source ${JSON.stringify(s)}`)
		}
		if (!graph.has(t)) {
			throw new Error(`Undefined edge target ${JSON.stringify(t)}`)
		}

		const source = graph.get(s);
		const target = graph.get(t);

		if (target.parentId === s) {
			throw new Error(`Edge ${JSON.stringify(s)} to ${JSON.stringify(t)} duplication`);
		}

		target.parentId = s;
		source.children.push(target);
	}

	if (pending.size > 0) {
		throw new Error(`Undefined parent nodes ${JSON.stringify(pending.keys(), null, '  ')}`);
	}

	const roots = [];

	for (const node of graph.values()) {
		if (!node.parentId) {
			roots.push(node);
		}
	}

	return roots;
}