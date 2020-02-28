import React from "react";
import { G } from "./G.js";
import { Switch } from "antd";
import { nodeStyle, linkStyle } from "../style/nodeLinkStyle";
class NodeLink extends React.Component {
  constructor(props) {
    super(props);
    let GraphData = props.graphData;
    this.state = { date: new Date() };
    this.lassoNdoes = [];
    this.g = new G({
      data: GraphData
    });
    this.switchOnchange = checked => {
      if (checked) {
        this.g.toggleLasso(true);
      } else {
        this.g.toggleLasso(false);
      }
    };
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
      this.g.links().forEach(link => {
        link.strokeColor = linkStyle.strokeColor;
      });
      this.g.endBatch();
      this.g.refresh();
    };
  }
  render() {
    return (
      <div
        id="nodelink"
        style={{ position: "relative", width: "1000px", height: "1000px" }}
      >
        <canvas
          id="nodelink-canvas"
          style={{ position: "absolute" }}
          width="1000"
          height="1000"
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
    const canvas = document.getElementById("nodelink-canvas");
    const width = canvas.width;
    const height = canvas.height;
    const g = this.g;
    g.container(canvas);
    this.nodeRefresh(width, height);
    g.on("zoom", () => {});
    g.on("pan", () => {});
    const nodeClick = obj => {
      let node = obj.target;
      g.beginBatch();
      this.g.nodes().forEach(node => {
        node.fill = nodeStyle.fill;
        node.r = nodeStyle.r;
      });
      node.fill = nodeStyle.clickFill;
      node.r = nodeStyle.clickR;
      g.endBatch();
      g.refresh();
      console.log(node);
    };
    g.nodes().forEach(node => {
      node.on("mousedown", node => {
        nodeClick(node);
      });
      // node.on('drag', console.log)
    });
    g.initLasso(document.querySelector("#nodelink"));
    g.on("lasso", nodes => {
      g.beginBatch();
      // this.lassoNdoes.forEach((n) => {
      // 	n.fill = nodeStyle.fill
      // 	n.r = nodeStyle.r
      // })
      this.g.nodes().forEach(node => {
        node.fill = nodeStyle.fill;
        node.r = nodeStyle.r;
      });
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

export default NodeLink;
