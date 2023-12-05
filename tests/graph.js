const {expect} = require('chai');
const {create} = require('../lib/graph');

describe('graph', function () {
	it('create with parentId', function () {
		const nodes = [
			{
				id: 1,
				parentId: 2,
			},
			{
				id: 2,
				parentId: 3,
			},
			{
				id: 4,
				parentId: 3,
			},
			{
				id: 5,
				parentId: 3,
			},
			{
				id: 3,
			},
		];

		const graph = create(nodes);

		expect(graph).to.eql([
			{
				id: 3,
				parentId: null,
				children: [
					{
						id: 2,
						parentId: 3,
						children: [
							{
								id: 1,
								parentId: 2,
								children: [],
							},
						]
					},
					{
						id: 4,
						parentId: 3,
						children: [],
					},
					{
						id: 5,
						parentId: 3,
						children: [],
					},
				]
			}
		]);
	});

	it('create with children', function () {
		const nodes = [
			{
				id: 1,
				children: [
					{
						id: 2
					}
				],
			},
			{
				id: 3,
				children: [
					{id: 4},
					{id: 5},
				]
			},
		];

		const graph = create(nodes);

		expect(graph).to.eql([
			{
				id: 1,
				parentId: null,
				children: [
					{
						id: 2,
						parentId: 1,
						children: [],
					}
				],
			},
			{
				id: 3,
				parentId: null,
				children: [
					{
						id: 4,
						parentId: 3,
						children: [],
					},
					{
						id: 5,
						parentId: 3,
						children: [],
					},
				]
			}
		]);
	});

	it('create with edges', function () {
		const nodes = [
			{
				id: 1,
			},
			{
				id: 2,
			},
			{
				id: 3,
			},
			{
				id: 4,
			},
		];

		const edges = [
			{
				source: 1,
				target: 2,
			},
			{
				source: 1,
				target: 3,
			},
		];

		const graph = create(nodes, edges);

		expect(graph).to.eql([
			{
				id: 1,
				parentId: null,
				children: [
					{
						id: 2,
						parentId: 1,
						children: [],
					},
					{
						id: 3,
						parentId: 1,
						children: [],
					},
				],
			},
			{
				id: 4,
				parentId: null,
				children: []
			}
		]);
	});
});