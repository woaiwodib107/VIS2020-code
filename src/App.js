import React from 'react'
import './App.css'
import graphData from './data/player_graph/1/1_friend' 
import NodeLink from './com/nodeLink'
import Projection from './com/projection'
import Charts from './com/charts'
function App() {
	return (
		<div
			style={{
				padding: '20px',
				display: 'grid',
				gridTemplateColumns: 'auto auto',
				gridTemplateRows: 'auto',
				gridGap: '10px',
			}}
		>
			<div>
				<Charts graphData = {graphData} />
			</div>
			<Projection />
			<div style={{ height: 1080, width: 920 }}>
				<NodeLink graphData = {graphData}/>
			</div>
		</div>
	)
}

export default App
