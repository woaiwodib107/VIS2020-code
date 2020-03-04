import React from "react";
import "./content.css";
import { G } from "./G.js";
import { Switch, Input, Slider } from "antd";
import { nodeStyle, linkStyle } from "../style/nodeLinkStyle";
const { Search } = Input;
const marks = {
  1: "1",
  2: "2",
  3: "3"
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
  initNodeStyle = () => {
    this.g.nodes().forEach(node => {
      node.fill = nodeStyle.fill;
      node.strokeWidth = nodeStyle.strokeWidth;
      node.r = nodeStyle.r;
    });
    // this.g.refresh();
  };
  handleHopEvent = hop_value => {
    // const { node_list } = this.props;
    // this.nodeRefresh();
    this.initNodeStyle();
    const node_list = ["1300550662", "1300423168"];
    if (node_list === undefined) return;
    const orange = { r: 255 / 255, g: 165 / 255, b: 0, a: 1 };
    const orange2 = { r: 255 / 255, g: 165 / 255, b: 0, a: 0.5 };
    const red = { r: 1, g: 0, b: 0, a: 1 };
    // const { nodes } = this.props.graphData;
    node_list.forEach(value => {
      const node = this.g.getNodeById(value);
      if (node === undefined) {
        alert("node===undefined");
      } else {
        let links = this.g.links();
        let one_hop_neighbours = [];
        let two_hop_neighbours = [];
        let one_hop_links = [];
        let two_hop_links = [];
        let getNeighbours = (node, item, node_container, link_container) => {
          if (item.source === node) {
            node_container.push(item.target);
            // link_container.push(this.g.getLinkByEnd(node.id, item.target.id));
          } else if (item.target === node) {
            node_container.push(item.source);
            // link_container.push(this.g.getLinkByEnd(node.id, item.source.id));
          }
        };
        links.forEach(item => {
          if (item.source === node) {
            one_hop_neighbours.push(item.target);
            // one_hop_links.push(this.g.getLinkByEnd(node.id, item.target.id));
            let one_hop_node = item.target;
            links.forEach(item => {
              // if (item.source === one_hop_node && item.source !== node) {
              //   two_hop_neignbours.push(item.target);
              //   two_hop_links.push(
              //     this.g.getLinkByEnd(one_hop_node.id, item.target.id)
              //   );
              // } else if (item.target === one_hop_node && item.target !== node) {
              //   two_hop_neignbours.push(item.source);
              //   two_hop_links.push(
              //     this.g.getLinkByEnd(one_hop_node.id, item.source.id)
              //   );
              // }
              if (item.source !== node && item.target !== node) {
                getNeighbours(
                  one_hop_node,
                  item,
                  two_hop_neighbours,
                  two_hop_links
                );
              }
            });
          } else if (item.target === node) {
            one_hop_neighbours.push(item.source);
            // one_hop_links.push(this.g.getLinkByEnd(node.id, item.source.id));
            let one_hop_node = item.source;
            links.forEach(item => {
              if (item.source !== node && item.target !== node) {
                getNeighbours(
                  one_hop_node,
                  item,
                  two_hop_neighbours,
                  two_hop_links
                );
              }
            });
          }
        });
        if (hop_value === 1) {
          one_hop_neighbours.forEach(item => {
            item.fill = orange;
            item.r = 10;
          });
          // one_hop_links.forEach(item => {
          //   item.strokeWidth = 3;
          //   item.strokeColor = orange;
          // });
        } else if (hop_value === 2) {
          two_hop_neighbours.forEach(item => {
            item.fill = orange2;
            item.r = 10;
          });
          // two_hop_links.forEach(item => {
          //   item.strokeWidth = 3;
          //   item.strokeColor = orange2;
          // });
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
          <div className="inline" style={{ width: 200, marginLeft: 100 }}>
            {/* <Search onSearch={value => this.handleHopEvent(value)}></Search> */}
            <Slider
              marks={marks}
              step={null}
              defaultValue={20}
              onAfterChange={value => {
                this.handleHopEvent(value);
              }}
              dots={false}
              min={0}
              max={4}
            />
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
