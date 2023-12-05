export function create(nodes: Node[], edges?: Edge[]): Graph[];

export type Node = {
	id: ID,
	parentId?: ID,
	children?: Node[],

	[prop: number | string]: any,
};

export type Edge = {
	source: ID,
	target: ID,
};

export type ID = number | string;

export type Graph = Required<Node>;