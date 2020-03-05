import React from "react";
import "./content.css";
import { G } from "./G.js";
import { Switch, Slider, Input } from "antd";
import { nodeStyle, linkStyle } from "../style/nodeLinkStyle";
const { Search } = Input;
const marks = {
  1: "1",
  2: "2"
};
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
  initNode = () => {
    this.g.nodes().forEach(node => {
      node.fill = nodeStyle.fill;
      node.strokeWidth = nodeStyle.strokeWidth;
      node.r = nodeStyle.r;
    });
  };
  handleHopEvent = hopNumber => {
    const orange = { r: 255 / 255, g: 165 / 255, b: 0, a: 1 };
    const orange2 = { r: 255 / 255, g: 165 / 255, b: 0, a: 0.5 };
    const red = { r: 1, g: 0, b: 0, a: 1 };
    const { nodes } = this.props.graphData;
    // const values = this.props.nodeList;
    const values = [42300604419];
    this.initNode();
    values.forEach(value => {
      const node = this.g.getNodeById(value.toString());
      if (node === undefined) {
        alert("node===undefined");
      } else {
        let one_hop_neighbours = [];
        let two_hop_neighbours = [];
        nodes.forEach(node_data => {
          if (node_data.id === value.toString()) {
            node_data.edges.forEach(n => {
              const des_n = this.g.getNodeById(n.toString());
              one_hop_neighbours.push(des_n);
            });
          }
        });
        if (hopNumber === 1)
          one_hop_neighbours.forEach(item => {
            item.fill = orange;
            item.r = 10;
          });
        else if (hopNumber === 2) {
          one_hop_neighbours.forEach(item => {
            nodes.forEach(node_data => {
              if (node_data.id === item.id) {
                node_data.edges.forEach(n => {
                  const des_n = this.g.getNodeById(n.toString());
                  if (des_n !== node) two_hop_neighbours.push(des_n);
                });
              }
            });
          });
          two_hop_neighbours.forEach(item => {
            item.fill = orange2;
            item.r = 10;
          });
        }
        node.fill = red;
        this.g.refresh();
      }
    });
  };
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
        <div>
          <div className="inline">
            <Switch
              checkedChildren="ON"
              unCheckedChildren="OFF"
              defaultChecked
              onChange={this.switchOnchange}
            />
          </div>
          <div className="inline" style={{ width: 250, marginLeft: 50 }}>
            <Slider
              marks={marks}
              max={3}
              min={0}
              dots={true}
              step={1}
              onAfterChange={hopNumber => this.handleHopEvent(hopNumber)}
            ></Slider>
          </div>
        </div>
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
