import React from "react";
import { observer, inject } from "mobx-react";
import { toJS } from "mobx";
import { Table } from "antd";
@inject("mainStore")
@observer
class ClusterView extends React.Component {
  constructor(props) {
    super(props);
    this.graphData = this.props.graphData;
    this.localData = this.props.localData;
    this.clusterTypeNum = 10;
    this.clusterObj = {};
    this.dataSourceCluster = [];
    for (let key in this.localData) {
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
      this.dataSourceCluster.push(data);
    }
  }
  render() {
    const rowSelectionCluster = {
      onChange: (selectedRowKeys, selectedRows) => {
        let nodesID = this.clusterObj[selectedRows[0]["cluster_id"]];
        let nodesAttr = nodesID.map(id => this.graphData[id]);
        this.props.mainStore.setNodesList(nodesAttr);
        this.props.mainStore.setNodes(nodesAttr);
      }
    };
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
      <Table
        rowSelection={{
          type: "radio",
          ...rowSelectionCluster
        }}
        dataSource={this.dataSourceCluster}
        columns={columnsCluster}
        size="small"
        pagination={{
          defaultPageSize: 4,
          hideOnSinglePage: true
        }}
        style={{
          width: "500px",
          height: "200px"
        }}
        scroll={{
          x: 400
        }}
      />
    );
  }
}

export default ClusterView;
