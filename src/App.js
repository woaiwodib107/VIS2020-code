import React from "react";
import "./App.css";
import graphData from "./data/constructed_graph_add_topology_attributes/42/42_trade_undirected_topo_attrs";
import projectionData from "./data/embedding_data/42_trade_embedding";
import NodeLink from "./com/nodeLink";
import Projection from "./com/projection";
import Charts from "./com/charts";
function App() {
  return (
    <div
      style={{
        padding: "20px",
        display: "grid",
        gridTemplateColumns: "7fr 9fr",
        gridTemplateRows: "1fr 1fr",
        gridGap: "10px",
        placeItems: "center center",
        gridAutoFlow: "column"
      }}
    >
      <div>
        <Projection projectionData={projectionData} />
      </div>
      <div>
        <Charts graphData={graphData} />
      </div>
      <div style={{ gridRowStart: "span 2", placeSelf: "center center" }}>
        <NodeLink graphData={graphData} />
      </div>
    </div>
  );
}

export default App;
