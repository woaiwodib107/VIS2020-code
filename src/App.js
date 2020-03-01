import React from "react";
import "./App.css";
import graphData from "./data/attrs_distribution_topo_data/42_trade_topo_attrs_distribution";
import localGlobalData from "./data/attrs_distribution_topo_data/attrs_distribution_describe_add_local_global";
import projectionData from "./data/pca_cluster_anomaly_data/42_trade_pca_cluster_anomaly";
import NodeLink from "./com/nodeLink";
import ProjectionView from "./com/projectionView";
import Charts from "./com/barChart/charts";
function App() {
  return (
    <div
      style={{
        width: "1920px",
        height: "1080px",
        padding: "10px",
        display: "grid",
        gridTemplateColumns: "7fr 9fr",
        gridTemplateRows: "1fr 1fr",
        gridGap: "10px",
        placeItems: "center center",
        gridAutoFlow: "column"
      }}
    >
      <div
        style={{
          placeSelf: "start center",
          padding: "50px"
        }}
      >
        <ProjectionView projectionData={projectionData} graphData={graphData} />
      </div>
      <div
        style={{
          placeSelf: "end center",
          padding: "30px"
        }}
      >
        {/* <NodeLink graphData={graphData} /> */}
      </div>
      <div
        style={{
          gridRowStart: "span 2",
          placeSelf: "center center"
        }}
      >
        <Charts localGlobalData={localGlobalData} />
      </div>
    </div>
  );
}

export default App;
