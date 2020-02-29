import React from "react";
import "./App.css";
import graphData from "./data/42_trade_graph";
// import projectionData from "./data/42_trade_embedding";
// import NodeLink from "./com/nodeLink";
// import ProjectionView from "./com/projectionView";
import Charts from "./com/charts";
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
        {/* <ProjectionView projectionData={projectionData} /> */}
      </div>
      <div
        style={{
          placeSelf: "end center",
          padding: "30px"
        }}
      >
        <Charts graphData={graphData} />
      </div>
      <div
        style={{
          gridRowStart: "span 2",
          placeSelf: "center center"
        }}
      >
        {/* <NodeLink graphData={graphData} /> */}
      </div>
    </div>
  );
}

export default App;
