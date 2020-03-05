import React from "react";
import { observer, inject } from "mobx-react";
import { toJS } from "mobx";
import { G } from "./G.js";
import { Radio } from "antd";
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
    let localData = this.props.localData;
    let globalData = this.props.globalData;
    let LocalData = { nodes: [], links: [] };
    this.encodeMode = 0;
    for (let key in localData) {
      let node = {};
      node.id = key;
      LocalData["nodes"].push(node);
    }
    this.lassoNdoes = [];
    this.g = new G({
      data: LocalData
    });
    this.nodeRefresh = (width, height) => {
      this.g.beginBatch();
      let publicFunc = (node, i) => {
        node.renderID = i;
        node.r = nodeStyle.r;
        node.strokeWidth = nodeStyle.strokeWidth;
        node.strokeColor = nodeStyle.strokeColor;
        node.x = ((+localData[node.id]["pca"][0] + 0.05) / 0.15) * width;
        node.y = ((+localData[node.id]["pca"][1] + 0.02) / 0.1) * height;
      };
      switch (this.encodeMode) {
        case 0:
          {
            this.g.nodes().forEach((node, i) => {
              node.fill = colorScheme[+localData[node.id]["cl"]];
              publicFunc(node, i);
            });
          }
          break;
        case 1:
          {
            this.g.nodes().forEach((node, i) => {
              node.fill =
                +localData[node.id]["an"] === -1
                  ? nodeStyle.fill
                  : { r: 0, g: 0, b: 0, a: 1.0 };
              publicFunc(node, i);
            });
          }
          break;
        case 2:
          {
            this.g.nodes().forEach((node, i) => {
              node.fill = colorScheme[+globalData[node.id]["cl"]];
              publicFunc(node, i);
            });
          }
          break;
        case 3:
          {
            this.g.nodes().forEach((node, i) => {
              node.fill =
                +globalData[node.id]["an"] === -1
                  ? nodeStyle.fill
                  : { r: 0, g: 0, b: 0, a: 1.0 };
              publicFunc(node, i);
            });
          }
          break;
        default: {
        }
      }
      this.g.endBatch();
      this.g.refresh();
    };
    this.encodeOnChange = e => {
      this.encodeMode = +e.target.value;
      const canvas = document.getElementById("projection-canvas");
      const width = canvas.width;
      const height = canvas.height;
      this.nodeRefresh(width, height);
    };
  }
  render() {
    return (
      <div
        id="projection"
        style={{ position: "relative", width: "500px", height: "500px" }}
      >
        <div>
          <canvas
            id="projection-canvas"
            style={{ position: "absolute" }}
            width="500"
            height="500"
          ></canvas>
        </div>
        <div>
          <div style={{ marginTop: -12 }}>
            <Radio.Group defaultValue="a" size="small">
              <Radio.Button value="a">pca</Radio.Button>
              <Radio.Button value="b" disabled>
                mds
              </Radio.Button>
              <Radio.Button value="c" disabled>
                tsne
              </Radio.Button>
            </Radio.Group>
          </div>
          <div style={{ marginTop: 2 }}>
            <Radio.Group
              defaultValue="0"
              size="small"
              onChange={this.encodeOnChange}
            >
              <Radio.Button value="0">local: cluster</Radio.Button>
              <Radio.Button value="1">local: anomaly</Radio.Button>
              <Radio.Button value="2">global: cluster</Radio.Button>
              <Radio.Button value="3">global: anomaly</Radio.Button>
            </Radio.Group>
          </div>
        </div>
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
      this.nodeRefresh(width, height);
      this.lassoNdoes = nodes;
      let nodesAttr = [];
      let nodesId = [];
      nodes.forEach(n => {
        nodesId.push(n.id);
        nodesAttr.push(graphData[n.id]);
        n.fill = nodeStyle.lassoFill;
        n.r = nodeStyle.lassoR;
      });
      this.props.mainStore.setNodesList(nodesId);
      this.props.mainStore.setNodes(nodesAttr);
      console.log(toJS(this.props.mainStore.nodesList));
      // console.log(toJS(this.props.mainStore.selectedNodes));
      g.endBatch();
      g.refresh();
    });
    this.g.toggleLasso(true);
  }
}
export default Projection;
