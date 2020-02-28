import React from "react";
import Projection from "./projection";
import { Tabs, Icon, Table } from "antd";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

class ProjectionView extends React.Component {
  constructor(props) {
    super(props);
    this.ProjectionData = props.projectionData;
  }
  render() {
    let projectionData = this.ProjectionData;
    const dataSource = [
      {
        key: "1",
        name: "胡彦斌",
        age: 32,
        address: "西湖区湖底公园1号"
      },
      {
        key: "2",
        name: "胡彦祖",
        age: 42,
        address: "西湖区湖底公园1号"
      }
    ];

    const columns = [
      {
        title: "姓名",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "年龄",
        dataIndex: "age",
        key: "age"
      },
      {
        title: "住址",
        dataIndex: "address",
        key: "address"
      }
    ];
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
          <Projection projectionData={projectionData} />
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
          <Table dataSource={dataSource} columns={columns} />
        </TabPane>
        <TabPane
          tab={
            <span>
              <Icon type="table" />
              Community
            </span>
          }
          key="3"
        >
          <Table dataSource={dataSource} columns={columns} />
        </TabPane>
      </Tabs>
    );
  }
}

export default ProjectionView;
