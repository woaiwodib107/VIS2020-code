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
    this.nodeRefresh = (width, height) => {
      this.g.beginBatch();
      this.g.nodes().forEach((node, i) => {
        node.fill = nodeStyle.fill;
        node.strokeWidth = nodeStyle.strokeWidth;
        node.renderID = i;
        node.r = nodeStyle.r;
        node.strokeColor = nodeStyle.strokeColor;
        node.x = ((+projectionData[node.id]["pca"][0] + 0.05) / 0.15) * width;
        node.y = ((+projectionData[node.id]["pca"][1] + 0.02) / 0.1) * height;
        if (i % 1000 == 0) {
        }
      });
      this.g.endBatch();
      this.g.refresh();
    };
    this.switchOnchange = checked => {
      if (checked) {
        this.g.toggleLasso(true);
      } else {
        this.g.toggleLasso(false);
      }
    };
  }
  render() {
    return (
      <div
        id="projection"
        style={{ position: "relative", width: "300px", height: "300px" }}
      >
        <canvas
          id="projection-canvas"
          style={{ position: "absolute" }}
          width="300"
          height="300"
        ></canvas>
        <Switch
          checkedChildren="ON"
          unCheckedChildren="OFF"
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
      let nodesAttr = []
      nodes.forEach(n => {
        nodesAttr.push(graphData[n.id]);
        n.fill = nodeStyle.lassoFill;
        n.r = nodeStyle.lassoR;
      });
      this.props.mainStore.setNodes(nodesAttr);
      console.log(toJS(this.props.mainStore.selectedNodes))
      g.endBatch();
      g.refresh();
    });
  }
}
export default Projection;
