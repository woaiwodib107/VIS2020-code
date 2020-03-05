import React from "react";
import { observer, inject } from "mobx-react";
import { toJS } from "mobx";
import globalData from "../data/pca_cluster_anomaly_data/4_and_42_trade_pca_cluster_anomaly";
import { Tabs, Icon, Table, Tag, Radio } from "antd";
const { TabPane } = Tabs;
@inject("mainStore")
@observer
class CAView extends React.Component {
  constructor(props) {
    super(props);
    let graphData = this.props.graphData;
    this.graphDataObj = {};
    graphData["nodes"].forEach(node => {
      let id = node["id"];
      this.graphDataObj[id] = {};
      this.graphDataObj[id]["attrs"] = node["attrs"];
      this.graphDataObj[id]["topo_attrs"] = node["topo_attrs"];
    });
    this.localData = this.props.localData;
    this.clusterTypeNum = 10;
    this.clusterObj = {};
    this.dataSourceAnomaly = [];
    this.dataSourceCluster = [];
    for (let key in this.localData) {
      let node = {};
      node.id = key;
      node.isAnomalyLocal = +this.localData[key]["an"];
      node.isAnomalyGlobal = +globalData[key]["an"];
      if (node.isAnomalyLocal !== 1 || node.isAnomalyGlobal !== 1) {
        this.dataSourceAnomaly.push(node);
      }
      let clusterID = this.localData[key]["cl"];
      if (this.clusterObj[clusterID] === undefined) {
        this.clusterObj[clusterID] = [];
      }
      this.clusterObj[clusterID].push(key);
    }
    this.clusterMaxNum = 0;
    for (let key in this.clusterObj) {
      if (this.clusterObj[key].length > this.clusterMaxNum) {
        this.clusterMaxNum = this.clusterObj[key].length;
      }
    }
    for (let i = 0; i < this.clusterTypeNum; i++) {
      let data = {};
      data["key"] = i;
      data["cluster_id"] = i;
      for (let j = 0; j < this.clusterObj[i].length; j++) {
        data["id_" + j] = this.clusterObj[i][j];
      }
      // for(let j = 0; j < this.clusterMaxNum; j++){
      //   if(j<this.clusterObj[i].length){
      //     data['id_'+j] = this.clusterObj[i][j];
      //   } else {
      //     data['id_'+j] = 'null';
      //   }
      // }
      this.dataSourceCluster.push(data);
    }
  }
  render() {
    const rowSelectionAbnomaly = {
      onChange: (selectedRowKeys, selectedRows) => {
        let id = selectedRows[0]["id"];
        let nodesAttr = this.graphDataObj[id];
        this.props.mainStore.setNodesList([id]);
        this.props.mainStore.setNodes([nodesAttr]);
        // console.log(toJS(this.props.mainStore.selectedNodes));
        console.log(toJS(this.props.mainStore.nodesList));
      }
    };
    const rowSelectionCluster = {
      onChange: (selectedRowKeys, selectedRows) => {
        let nodesID = this.clusterObj[selectedRows[0]["cluster_id"]];
        let nodesAttr = nodesID.map(id => this.graphDataObj[id]);
        this.props.mainStore.setNodesList(nodesAttr);
        this.props.mainStore.setNodes(nodesAttr);
        // console.log(toJS(this.props.mainStore.selectedNodes));
        console.log(toJS(this.props.mainStore.nodesList));
      }
    };
    const columnsAnomaly = [
      {
        title: "id",
        dataIndex: "id",
        key: "id"
      },
      {
        title: "local",
        dataIndex: "isAnomalyLocal",
        key: "isAnomalyLocal",
        render: text => (
          <Tag color={text === 1 ? "green" : "volcano"}>
            {text === 1 ? "normal" : "abnormal"}
          </Tag>
        )
      },
      {
        title: "global",
        dataIndex: "isAnomalyGlobal",
        key: "isAnomalyGlobal",
        render: text => (
          <Tag color={text === 1 ? "green" : "volcano"}>
            {text === 1 ? "normal" : "abnormal"}
          </Tag>
        )
      }
    ];
    const columnsCluster = [
      {
        title: "cluster",
        dataIndex: "cluster_id",
        key: "cluster_id",
        fixed: "left",
        width: 60
      }
    ];
    for (let i = 0; i < 30; i++) {
      columnsCluster.push({
        title: "id_" + i,
        dataIndex: "id_" + i,
        key: "id_" + i,
        width: 100
      });
    }
    return (
      <Tabs defaultActiveKey="1" type="card">
        <TabPane
          tab={
            <span>
              <Icon type="table" />
              Anormaly
            </span>
          }
          key="2"
        >
          <Table
            rowSelection={{
              type: "radio",
              ...rowSelectionAbnomaly
            }}
            dataSource={this.dataSourceAnomaly}
            columns={columnsAnomaly}
            tableLayout="fixed"
            size="small"
            pagination={{
              defaultPageSize: 30
            }}
            scroll={{
              x: 500,
              y: 860
            }}
          />
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
              ...rowSelectionCluster
            }}
            dataSource={this.dataSourceCluster}
            columns={columnsCluster}
            size="small"
            pagination={false}
            scroll={{
              x: 500,
              y: 500
            }}
          />
        </TabPane>
      </Tabs>
    );
  }
}

export default CAView;
