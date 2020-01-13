import React from 'react'
import { G } from './G.js'
import { GraphData } from '../data/GraphData'
import { Switch } from 'antd'
// console.log(G)
class NodeLink extends React.Component {
	constructor(props) {
		super(props)
		this.state = { date: new Date() }
		this.lassoNdoes = []
		this.nodeFill = {
			r: 36 / 255,
			g: 144 / 255,
			b: 200 / 255,
			a: 0.5,
		}
		this.nodeR = 5
		GraphData.nodes.forEach((node, i) => {
			node.renderID = i
		})
		this.g = new G({
			data: GraphData,
		})
		this.switchOnchange = (checked) => {
			if (checked) {
				this.g.toggleLasso(true)
			} else {
				this.g.toggleLasso(false)
			}
		}
	}
	render() {
		return (
			<div id="nodelink" style={{ position: 'relative' }}>
				<canvas
					id="nodelink-canvas"
					style={{ position: 'absolute' }}
					width="1000"
					height="1000"
				></canvas>
				<Switch
					checkedChildren="ON"
					unCheckedChildren="OFF"
					defaultChecked
					onChange={this.switchOnchange}
				/>
			</div>
		)
	}
	componentDidMount() {
		const canvas = document.getElementById('nodelink-canvas')
		const width = canvas.width
		const height = canvas.height
		const g = this.g
		g.container(canvas)
		g.beginBatch()
		g.nodes().forEach((node, i) => {
			node.fill = this.nodeFill
			node.strokeWidth = 1
			node.renderID = i
			node.r = this.nodeR
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
		g.on('zoom', () => {})
		g.on('pan', () => {})
		const nodeClick = (obj) => {
			console.log(obj)
		}
		g.nodes().forEach((node) => {
			node.on('mousedown', (obj) => {
				nodeClick(obj)
			})
			// node.on('drag', console.log)
		})
		g.initLasso(document.querySelector('#nodelink'))
		g.on('lasso', (nodes) => {
			g.beginBatch()
			this.lassoNdoes.forEach((n) => {
				n.fill = this.nodeFill
				n.r = this.nodeR
			})
			console.log(nodes)
			this.lassoNdoes = nodes
			nodes.forEach((n) => {
				n.fill = {
					r: 255 / 255,
					g: 0,
					b: 0,
					a: 1,
				}
				n.r = 8
			})
			g.endBatch()
			g.refresh()
		})
	}
}

export default NodeLink
