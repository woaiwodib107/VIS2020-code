import React from 'react'
import { G } from './G.js'
import { GraphData } from '../data/GraphData'
// console.log(G)
class NodeLink extends React.Component {
	constructor(props) {
		super(props)
		this.state = { date: new Date() }
	}
	render() {
		return (
			<div id="nodelink">
				<canvas
					id="nodelink-canvas"
					width="1000"
					height="1000"
				></canvas>
			</div>
		)
	}
	componentDidMount() {
		const canvas = document.getElementById('nodelink-canvas')
		const width = canvas.width
		const height = canvas.height
		const g = new G({
			container: canvas,
			data: GraphData,
		})
		g.beginBatch()
		g.nodes().forEach((node) => {
			node.fill = {
				r: 36 / 255,
				g: 144 / 255,
				b: 200 / 255,
				a: 0.5,
			}
			node.strokeWidth = 1
			node.r = 5
			node.strokeColor = {
				r: 200 / 255,
				g: 36 / 255,
				b: 144 / 255,
				a: 0.1,
			}
			node.x = Math.random() * width
			node.y = Math.random() * height
		})
		g.links().forEach((link) => {
			link.strokeColor = {
				r: 153 / 255,
				g: 153 / 255,
				b: 153 / 255,
				a: 0.1,
			}
		})
		g.endBatch()
		g.refresh()
		const nodeClick = (obj) => {
			console.log(obj)
		}
		g.nodes().forEach((node) => {
			node.on('mousedown', (obj) => {
				nodeClick(obj)
			})
			// node.on('drag', console.log)
		})
	}
}

export default NodeLink
