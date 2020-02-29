import React from "react";
import { observer, inject } from "mobx-react";
import { toJS } from "mobx";
import Projection from "./projection";
import { Tabs, Icon, Table, Tag, Radio } from "antd";
const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

@inject("mainStore")
@observer
class ProjectionView extends React.Component {
  constructor(props) {
    super(props);
    let graphData = this.props.graphData;
    this.graphDataObj = {};
    graphData["nodes"].forEach((node)=>{
      let id = node["id"]
      this.graphDataObj[id] = {}
      this.graphDataObj[id]["attrs"] = node["attrs"];
      this.graphDataObj[id]["topo_attrs"] = node["topo_attrs"];
    })
    this.projectionData = this.props.projectionData;
    this.dataSource = [];
    for(let key in this.projectionData){
      let node = {}
      node.id = key;
      node.isAnomaly = +this.projectionData[key]["an"];
      node.clusterID = this.projectionData[key]["cl"];
      this.dataSource.push(node);
    }
  }
  render() {
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        let node = this.graphDataObj[selectedRows[0]["id"]];
        this.props.mainStore.setNodes([node]);
        console.log(toJS(this.props.mainStore.selectedNodes))
      }
    };
    const columnsAnomaly = [
      {
      title: "id",
      dataIndex: "id",
      key: "id",
      },
      {
      title: "isAnomaly",
      dataIndex: "isAnomaly",
      key: "isAnomaly",
      render: text => <Tag color={text===1?"green":"volcano"}>
              {text===1?"normal":"abnormal"}
            </Tag>
      }
    ]
    const columnsCluster = [
      {
      title: "id",
      dataIndex: "id",
      key: "id",
      },
      {
      title: "clusterID",
      dataIndex: "clusterID",
      key: "clusterID"
      }
    ]
    return (
      <Tabs defaultActiveKey="1" type="card">
        <TabPane
          tab={
            <span>
              <Icon type="dot-chart" />
              Projection
            </span>
          }
          key="1"
        >
          <Projection projectionData={this.projectionData} graphData = {this.graphDataObj}/>
        </TabPane>
        <TabPane
          tab={
            <span>
              <Icon type="table" />
              Abnormal
            </span>
          }
          key="2"
        >
          <Table 
          rowSelection={{
            type: "radio",
            ...rowSelection,
          }}
          dataSource={this.dataSource} 
          columns={columnsAnomaly} 
          tableLayout="fixed"
          size="small"
          scroll={{
            x:"200px",
            y:"200px"
          }}/>
        </TabPane>
        <TabPane
          tab={
            <span>
              <Icon type="table" />
              Cluster
            </span>
          }
          key="3"
        >
          <Table 
          rowSelection={{
            type: "radio",
            ...rowSelection,
          }}
          dataSource={this.dataSource} 
          columns={columnsCluster} 
          tableLayout="fixed"
          size="small"
          scroll={{
            x:"200px",
            y:"200px"
          }}/>
        </TabPane>
      </Tabs>
    );
  }
}

export default ProjectionView;
