import React from "react";
import "./App.css";
import graphData from "./data/attrs_distribution_topo_data/42_trade_topo_attrs_distribution";
import localGlobalData from "./data/attrs_distribution_topo_data/attrs_distribution_describe_add_local_global";
import localData from "./data/pca_cluster_anomaly_data/42_trade_pca_cluster_anomaly";
import NodeLink from "./com/nodeLink";
import ProjectionView from "./com/projectionView";
import CAView from "./com/caView";
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
        gridTemplateColumns: "auto auto auto auto",
        gridTemplateRows: "1fr 1fr",
        gridGap: "8px",
        placeItems: "center center",
        gridAutoFlow: "column"
      }}
    >
      <div
        style={{
          placeSelf: "center center",
          padding: "30px"
        }}
      >
        <span> control panel </span>
      </div>
      <div
        style={{
          width: "500px",
          placeSelf: "start center",
          padding: "30px"
        }}
      >
        <ProjectionView localData={localData} graphData={graphData} />
      </div>
      <div
        style={{
          width: "500px",
          gridRowStart: "span 2",
          placeSelf: "start center",
          padding: "30px"
        }}
      >
        <CAView localData={localData} graphData={graphData} />
      </div>
      <div
        style={{
          placeSelf: "start center"
        }}
      >
        <Charts localGlobalData={localGlobalData} />
      </div>
      <div
        style={{
          placeSelf: "start center"
        }}
      >
        <Charts localGlobalData={localGlobalData} />
      </div>
      <div
        style={{
          placeSelf: "start center",
          padding: "30px"
        }}
      >
        {/* <NodeLink graphData={graphData} no={0} /> */}
      </div>
      <div
        style={{
          placeSelf: "end center",
          padding: "30px"
        }}
      >
        {/* <NodeLink graphData={graphData} no={1} /> */}
      </div>
    </div>
  );
}

export default App;
