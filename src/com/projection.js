import React from "react";
import { G } from "./G.js";
import { Switch } from "antd";
import { ProjectionData } from "../data/prjectionData";
import { nodeStyle } from "../style/nodeLinkStyle";

class Projection extends React.Component {
  constructor(props) {
    super(props);
    // let ProjectionData = props.projectionData;
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
        node.x = Math.random() * width;
        node.y = Math.random() * height;
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
      console.log(nodes);
      this.lassoNdoes = nodes;
      nodes.forEach(n => {
        n.fill = nodeStyle.lassoFill;
        n.r = nodeStyle.lassoR;
      });
      g.endBatch();
      g.refresh();
    });
  }
}
export default Projection;
