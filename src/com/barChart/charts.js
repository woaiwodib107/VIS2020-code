import React from "react";
import Bar from './Bar/index.js'
import './index.css'
import { observer, inject } from "mobx-react";
import { toJS } from "mobx";
@inject("mainStore")
@observer
class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderData: []
    }
    this.renderlocalGlobal = this.renderlocalGlobal.bind(this)
    this.computed = this.computed.bind(this)
  }
  componentDidMount(){
    let over = this.renderlocalGlobal()
    this.setState({
      renderData: over
    })
  }
  renderlocalGlobal(){
    const {localGlobalData} = this.props
    let overView = []
    let graphTitles = Object.keys(this.props.localGlobalData).slice(0,6)
    for(let i=0;i<graphTitles.length;i++ ){
        let title = graphTitles[i]
        let totalLocal = eval(localGlobalData[title].local_42.join("+"))
        let globalLocal = eval(localGlobalData[title].global_4_42.join("+"))
        let localData = {state: 'local'}
        let globalData = {state: 'global'}
        localGlobalData[title].seg.map( (d, i) =>{
          localData[d[0] === d[1]? d[0] : `${d[0]}-${d[1]}`] = localGlobalData[title].local_42[i] / totalLocal
          globalData[d[0] === d[1]? d[0] : `${d[0]}-${d[1]}`] = localGlobalData[title].global_4_42[i] / globalLocal
        })
        overView.push({
          title,
          data : [localData,globalData]
        })
    }
    return overView
  }
  computed(nodes,title){
    const {localGlobalData} = this.props
    let nodesData = {}
    let sum = 0
    nodes.map( node=> {
      //[0]属性值  [1]属于哪一段
      let d = localGlobalData[title].seg [node.attrs[title][1]]
      let group = d[0] === d[1]? d[0] : `${d[0]}-${d[1]}`
      if(nodesData[group]){
        nodesData[group]++
        sum++
      }else{
        nodesData[group] = 1
        sum++
      }
    })
    for(let key in nodesData){
      nodesData[key] = nodesData[key] / sum
    }
    nodesData.state = 'nodes'
    return nodesData
  }
  render() {
    let selectedNodes = toJS(this.props.mainStore.selectedNodes)
    let graphData = []
    if(selectedNodes.length>1){
    this.state.renderData.forEach(d => {
      let data = [...d.data]
      let nodesData = this.computed(selectedNodes,d.title)
      data.push(nodesData)
      graphData.push({
        title: d.title,
        data
      })
    })      
    }else{
      graphData = this.state.renderData
    }
    return (
      <div
        style={{
          height: 500,
          width: 800,
          padding: "20px",
          display: "grid",
          gridTemplateColumns: "auto auto",
          gridTemplateRows: "auto",
          gridGap: "10px"
        }}
      >
        {graphData.map((r, i) => {
          return (
            <div style={{ height: 250, border:'1px solid #e8e8e8' }} key={r.title} className={r.title}>
            <div className={'title-top'}>{r.title}属性分布图</div>
              <Bar width={350} height={200} data={r.data}/>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Charts;
