import React from 'react'
import Bar from './com/Bar'
import { randomData } from './data/raw'
import { barData } from './data/barData'
import { string } from 'prop-types'

function App() {
	const segment = 10
	let groups = randomData()
	let data = []
	let keys = Object.keys(groups[0][0])
	let obj = {}
	keys.forEach((key) => {
		console.log(key)
		obj[key] = []
		groups.forEach((group) => {
			group.forEach((user) => {
				obj[key].push(user[key])
			})
		})
	})
	let resultDataArr = []
	console.log(obj)

	Object.keys(obj).forEach((key) => {
		const arr = obj[key]
		if (typeof arr[0] !== 'string') {
			const max = Math.max(...arr)
			const min = Math.min(...arr)
			let r = {}
			const l = (max - min) / segment
			arr.forEach((d) => {
				const s = Math.floor((d - min) / l)
				if (!(s in r)) {
					r[s] = 0
				}
				r[s] += 1
			})
			const result = Object.entries(r).map((d) => {
				return {
					x: `${l * parseInt(d[0]) + min}-${l * parseInt(d[0]) +
						2 * min -
						1}`,
					y: d[1],
				}
			})
			resultDataArr.push([{ id: key, data: result }])
		} else {
			let r = {}
			arr.forEach((d) => {
				if (!(d in r)) {
					r[d] = 0
				}
				r[d] += 1
			})
			const result = Object.entries(r).map((d) => {
				return {
					x: d[0],
					y: d[1],
				}
			})
			resultDataArr.push([{ id: key, data: result }])
		}
	})
	console.log(resultDataArr)
	return (
		<div style={{ height: 1080, width: 1920 }}>
			{resultDataArr.map((r) => {
				return <Bar data={r}></Bar>
			})}
		</div>
	)
}

export default App
