import React from "react";
import "./App.css";
import graphData from "./data/attrs_distribution_topo_data/42_trade_topo_attrs_distribution";
import localGlobalData from "./data/attrs_distribution_topo_data/attrs_distribution_describe_add_local_global";
import localData from "./data/pca_cluster_anomaly_data/42_trade_pca_cluster_anomaly";
import NodeLink from "./com/nodeLink";
import EmbeddingView from "./com/embeddingView";
import ClusterView from "./com/clusterView";
import AnomalyView from "./com/anomalyView";
import Charts from "./com/barChart/charts";
import "./com/content.css";
function App() {
  return (
    <div
      style={{
        width: "1920px",
        height: "1080px",
        padding: "8px",
        display: "grid",
        gridTemplateColumns: "640fr 730fr 520fr",
        gridTemplateRows: "1fr",
        gridGap: "8px",
        placeItems: "center center",
        gridAutoFlow: "column"
      }}
    >
      <div
        style={{
          placeSelf: "center center",
          padding: "10px"
        }}
      >
        <EmbeddingView localData={localData} graphData={graphData} />
      </div>
      <div
        style={{
          placeSelf: "center center",
          padding: "10px"
        }}
      >
        <Charts localGlobalData={localGlobalData} />
      </div>
      <div
        style={{
          placeSelf: "center center",
          padding: "10px"
        }}
      >
        <NodeLink graphData={graphData} no={1} />
      </div>
    </div>
  );
}

export default App;
