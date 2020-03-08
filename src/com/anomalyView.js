import React from "react";
import { observer, inject } from "mobx-react";
import { Table, Tag } from "antd";
@inject("mainStore")
@observer
class AnomalyView extends React.Component {
  constructor(props) {
    super(props);
    let globalData = this.props.globalData;
    this.graphData = this.props.graphData;
    this.localData = this.props.localData;
    this.dataSourceAnomaly = [];
    for (let key in this.localData) {
      let node = {};
      node.id = key;
      node.isAnomalyLocal = +this.localData[key]["an"];
      node.isAnomalyGlobal = +globalData[key]["an"];
      if (node.isAnomalyLocal !== 1 || node.isAnomalyGlobal !== 1) {
        this.dataSourceAnomaly.push(node);
      }
    }
  }
  render() {
    const rowSelectionAbnomaly = {
      onChange: (selectedRowKeys, selectedRows) => {
        let id = selectedRows[0]["id"];
        let nodesAttr = this.graphData[id];
        this.props.mainStore.setNodesList([id]);
        this.props.mainStore.setNodes([nodesAttr]);
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
    return (
      <Table
        rowSelection={{
          type: "radio",
          ...rowSelectionAbnomaly
        }}
        dataSource={this.dataSourceAnomaly}
        columns={columnsAnomaly}
        size="small"
        pagination={{
          defaultPageSize: 4,
          hideOnSinglePage: true
        }}
        style={{
          width: "500px",
          height: "200px"
        }}
        tableLayout="fixed"
        // scroll={{
        //   x: 400,
        //   y: 250
        // }}
      />
    );
  }
}

export default AnomalyView;
