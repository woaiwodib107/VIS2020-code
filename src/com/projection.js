import React from "react";
import { observer, inject } from "mobx-react";
import { toJS } from "mobx";
import { G } from "./G.js";
import { Switch } from "antd";
import { nodeStyle } from "../style/nodeLinkStyle";

@inject("mainStore")
@observer
class Projection extends React.Component {
  constructor(props) {
    super(props);
    const colorScheme = [
      { r: 141 / 255, g: 211 / 255, b: 199 / 255, a: 1.0 },
      { r: 255 / 255, g: 255 / 255, b: 179 / 255, a: 1.0 },
      { r: 190 / 255, g: 186 / 255, b: 218 / 255, a: 1.0 },
      { r: 251 / 255, g: 128 / 255, b: 114 / 255, a: 1.0 },
      { r: 128 / 255, g: 177 / 255, b: 211 / 255, a: 1.0 },
      { r: 253 / 255, g: 180 / 255, b: 98 / 255, a: 1.0 },
      { r: 179 / 255, g: 222 / 255, b: 105 / 255, a: 1.0 },
      { r: 252 / 255, g: 205 / 255, b: 229 / 255, a: 1.0 },
      { r: 217 / 255, g: 217 / 255, b: 217 / 255, a: 1.0 },
      { r: 188 / 255, g: 128 / 255, b: 189 / 255, a: 1.0 }
    ];
    let projectionData = props.projectionData;
    let ProjectionData = { nodes: [], links: [] };
    for (let key in projectionData) {
      let node = {};
      node.id = key;
      ProjectionData["nodes"].push(node);
    }
    this.lassoNdoes = [];
    this.g = new G({
      data: ProjectionData
    });
    this.nodeRefresh = (width, height, clusterMode = true) => {
      this.g.beginBatch();
      if (clusterMode) {
        this.g.nodes().forEach((node, i) => {
          node.fill = colorScheme[+projectionData[node.id]["cl"]];
          node.strokeWidth = nodeStyle.strokeWidth;
          node.renderID = i;
          node.r = nodeStyle.r;
          node.strokeColor = nodeStyle.strokeColor;
          node.x = ((+projectionData[node.id]["pca"][0] + 0.05) / 0.15) * width;
          node.y = ((+projectionData[node.id]["pca"][1] + 0.02) / 0.1) * height;
          if (i % 1000 == 0) {
          }
        });
      } else {
        this.g.nodes().forEach((node, i) => {
          node.fill =
            +projectionData[node.id]["an"] === -1
              ? nodeStyle.fill
              : { r: 0, g: 0, b: 0, a: 1.0 };
          node.strokeWidth = nodeStyle.strokeWidth;
          node.renderID = i;
          node.r = nodeStyle.r;
          node.strokeColor = nodeStyle.strokeColor;
          node.x = ((+projectionData[node.id]["pca"][0] + 0.05) / 0.15) * width;
          node.y = ((+projectionData[node.id]["pca"][1] + 0.02) / 0.1) * height;
          if (i % 1000 == 0) {
          }
        });
      }
      this.g.endBatch();
      this.g.refresh();
    };
    this.switchOnchange = checked => {
      const canvas = document.getElementById("projection-canvas");
      const width = canvas.width;
      const height = canvas.height;
      let clusterMode;
      if (checked) {
        clusterMode = true;
      } else {
        clusterMode = false;
      }
      this.nodeRefresh(width, height, clusterMode);
    };
  }
  render() {
    return (
      <div
        id="projection"
        style={{ position: "relative", width: "400px", height: "400px" }}
      >
        <canvas
          id="projection-canvas"
          style={{ position: "absolute" }}
          width="400"
          height="400"
        ></canvas>
        <Switch
          checkedChildren="Cluster"
          unCheckedChildren="Anomaly"
          defaultChecked
          onChange={this.switchOnchange}
        />
      </div>
    );
  }
  componentDidMount() {
    let graphData = this.props.graphData;
    const canvas = document.getElementById("projection-canvas");
    const width = canvas.width;
    const height = canvas.height;
    const g = this.g;
    g.container(canvas);
    this.nodeRefresh(width, height);
    g.initLasso(document.querySelector("#projection"));
    g.on("zoom", () => {});
    g.on("pan", () => {});
    g.on("lasso", nodes => {
      g.beginBatch();
      this.lassoNdoes.forEach(n => {
        n.fill = nodeStyle.fill;
        n.r = nodeStyle.r;
      });
      this.g.nodes().forEach(node => {
        node.fill = nodeStyle.fill;
        node.r = nodeStyle.r;
      });
      this.lassoNdoes = nodes;
      let nodesAttr = [];
      nodes.forEach(n => {
        nodesAttr.push(graphData[n.id]);
        n.fill = nodeStyle.lassoFill;
        n.r = nodeStyle.lassoR;
      });
      this.props.mainStore.setNodes(nodesAttr);
      console.log(toJS(this.props.mainStore.selectedNodes));
      g.endBatch();
      g.refresh();
    });
    this.g.toggleLasso(true);
  }
}
export default Projection;
