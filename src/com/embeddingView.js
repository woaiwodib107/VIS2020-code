import React from "react";
import { observer, inject } from "mobx-react";
import { toJS } from "mobx";
import ProjectionView from "./projectionView";
import AnomalyView from "./anomalyView";
import ClusterView from "./clusterView";
import globalData from "../data/pca_cluster_anomaly_data/4_and_42_trade_pca_cluster_anomaly";
import { Tag } from "antd";
@inject("mainStore")
@observer
class EmbeddingView extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let localData = this.props.localData;
    let graphData = this.props.graphData;
    let graphDataObj = {};
    graphData["nodes"].forEach(node => {
      let id = node["id"];
      graphDataObj[id] = {};
      graphDataObj[id]["attrs"] = node["attrs"];
      graphDataObj[id]["topo_attrs"] = node["topo_attrs"];
    });
    return (
      <div
        style={{
          width: "620px",
          height: "1050px",
          border: "5px solid"
        }}
      >
        <div
          style={{
            width: "610px",
            borderBottom: "5px solid",
            margin: "0px",
            fontSize: "20px",
            padding: "10px"
          }}
        >
          Embedding View
        </div>
        <div style={{ margin: "10px 80px" }}>
          <ProjectionView
            localData={localData}
            globalData={globalData}
            graphData={graphDataObj}
          />
        </div>
        <div style={{ margin: "10px 55px" }}>
          <ClusterView
            localData={localData}
            globalData={globalData}
            graphData={graphDataObj}
          />
        </div>
        <div style={{ margin: "10px 55px" }}>
          <AnomalyView
            localData={localData}
            globalData={globalData}
            graphData={graphDataObj}
          />
        </div>
      </div>
    );
  }
}

export default EmbeddingView;
