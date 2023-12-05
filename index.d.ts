import * as graph from './lib/graph';

export function create(params: CreateParams): RadialLayout;

export type CreateParams = {
	graphNodes: Node[],
	graphEdges?: graph.Edge[],
};

export type Node = graph.Node & {
	width: number,
	height: number,
};

export class RadialLayout {

}