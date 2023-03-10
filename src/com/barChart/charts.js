import React from "react";
import Bar from "./Bar/index.js";
import "./index.css";
import * as d3 from "d3";
import { observer, inject } from "mobx-react";
import { toJS } from "mobx";
import { FORMERR } from "dns";
@inject("mainStore")
@observer
class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderData: []
    };
    this.renderlocalGlobal = this.renderlocalGlobal.bind(this);
    this.computed = this.computed.bind(this);
  }
  componentDidMount() {
    let over = this.renderlocalGlobal();
    //根据欧氏距离排序
    // console.log(over)
    over.sort((a, b) => {
      // console.log(this.varianceArr(a.data[1]) - this.varianceArr(b.data[1]))
      return this.varianceArr(a.data) - this.varianceArr(b.data);
    });
    this.setState({
      renderData: over
    });
  }
  renderlocalGlobal() {
    const { localGlobalData } = this.props;
    let overView = [];
    let graphTitles = Object.keys(localGlobalData).slice(0, 6);
    for (let i = 0; i < graphTitles.length; i++) {
      let xBand = {};
      let title = graphTitles[i];
      let type = localGlobalData[title].num === 2 ? "category1" : "yellow";
      let totalLocal = eval(localGlobalData[title].local_42.join("+"));
      let globalLocal = eval(localGlobalData[title].global_4_42.join("+"));
      let localData = { state: "local" };
      let globalData = { state: "global" };
      localGlobalData[title].seg.map((d, i) => {
        localData[d[0] === d[1] ? d[0] : `${d[0]}-${d[1]}`] =
          parseInt((localGlobalData[title].local_42[i] / totalLocal) * 100) + 1;
        globalData[d[0] === d[1] ? d[0] : `${d[0]}-${d[1]}`] =
          parseInt(
            (localGlobalData[title].global_4_42[i] / globalLocal) * 100
          ) + 1;

        // 将分段存下来
        for (let key in localData) {
          xBand[key] = 0;
        }
      });
      overView.push({
        title,
        type,
        xBand,
        data: [localData, globalData]
      });
    }
    return overView;
  }
  computed(nodes, title, xBand) {
    const { localGlobalData } = this.props;
    let nodesData = { ...xBand };
    let sum = 0;
    nodes.map(node => {
      //[0]属性值  [1]属于哪一段
      let d = localGlobalData[title].seg[node.attrs[title][1]];
      let group = d[0] === d[1] ? d[0] : `${d[0]}-${d[1]}`;
      if (nodesData[group]) {
        nodesData[group]++;
        sum++;
      } else {
        nodesData[group] = 1;
        sum++;
      }
    });
    for (let key in nodesData) {
      // if (key !== "state") {
      nodesData[key] = parseInt((nodesData[key] / sum) * 100) + 1;
      // }
    }
    nodesData.state = "nodes";
    return nodesData;
  }
  hightLight(selectNode) {
    for (let key in selectNode) {
      let d = selectNode[key][1];
      d3.selectAll(`.${key} .local${d}`).attr("stroke", "black");
    }
  }
  varianceArr(arr) {
    let diff = 0;
    let local = arr[0];
    let localData = [];
    let global = arr[1];
    let globalData = [];
    for (let key in local) {
      if (key !== "state") {
        localData.push(local[key]);
      }
    }
    for (let key in global) {
      if (key !== "state") {
        globalData.push(global[key]);
      }
    }
    for (let i = 0; i < localData.length; i++) {
      diff += Math.pow(localData[i] - globalData[i]);
    }
    return Math.sqrt(diff);
  }
  render() {
    let selectedNodes = toJS(this.props.mainStore.selectedNodes);
    let graphData = [];
    if (selectedNodes.length > 1) {
      d3.selectAll(".rect").attr("stroke", "none");
      this.state.renderData.forEach(d => {
        let data = [...d.data];
        let nodesData = this.computed(selectedNodes, d.title, d.xBand);
        // debugger
        // console.log(nodesData)
        data.push(nodesData);
        graphData.push({
          title: d.title,
          type: d.type,
          xBand: d.xBand,
          data
        });
      });
    } else if (selectedNodes.length === 1) {
      graphData = this.state.renderData;
      this.hightLight(selectedNodes[0].attrs);
    } else {
      graphData = this.state.renderData;
    }
    return (
      <div
        style={{
          width: "710px",
          height: "1050px",
          border: "5px solid"
        }}
      >
        <div
          style={{
            width: 700,
            borderBottom: "5px solid",
            margin: "0px",
            fontSize: "20px",
            padding: "10px"
          }}
        >
          Distribution View
        </div>
        <div
          style={{
            height: 500,
            width: 700,
            padding: "20px",
            display: "grid",
            gridTemplateColumns: "auto auto",
            gridTemplateRows: "auto",
            gridGap: "10px"
          }}
        >
          {graphData.map((r, i) => {
            return (
              <div
                style={{ height: 150, border: "1px solid #e8e8e8" }}
                key={r.title}
                className={r.title}
              >
                <div className={"title-top"}>{r.title}属性分布图</div>
                <Bar
                  width={300}
                  height={90}
                  data={r.data}
                  colorScheme={r.type}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Charts;
