# 数据格式说明

压缩包内共有 2 个文件夹，包括了 4 服务器和 42 服务器的数据

点边数如下：

|             | trade_graph 点数 | trade_graph 边数 |
| ----------- | ---------------- | ---------------- |
| 服务器 4    | 45687            | 239404           |
| 服务器 42   | 40657            | 231312           |
| 服务器 4+42 | 86344            | 470716           |

## pca_cluster_anomaly_data 文件夹

json 格式的文件，代表了 4 服务器（可以看做子图），42 服务器（可以看做子图）和 4+42 服务器（取 4 服务器和 42 服务器的并集，可以将其看做全局）的 pca（降至 2 维），聚类（目前采用 kmeans，聚成 10 类，从 0 到 9），异常检测（正常为 1，异常为 -1）

具体格式如下：

```json
{
  id1: {
    "pca": [dim1, dim2],
    "cl": cluster_id,
    "an": isAnomaly
  }
}
```



## attrs_distribution_topo_data 文件夹

attrs_distribution_describe.json 文件描述了属性分布的相关信息，暂时只选择了部分属性

格式如下

```json
{
  "attrs_name":{
    "num": total_segment_number,
    "seg": [[left0, right0], [left1, right1], ...]
  }
}
```

其中，num 代表将该属性分成的段数，seg 描述了分段左右端点的情况



trade_topo_attrs_distribution.json 描述了点的 id、邻居点 id、节点本身属性 attrs、图拓扑属性 topo_attrs，以及边的情况

格式如下：

```json
{
  "nodes":[
    "id": node_id,
    "edges": [neighbor1_id, neighbor2_id,...],
  	"attrs": {"attrs_name": [attrs_value, seg_id], ...},
  	"topo_attrs": {"topo_attrs_name": topo_attrs_value, ...}
  ],
  "links": [
     {"source": source_id, "target": target_id},
     ...
   ]
}
```

与之前 trade_undirected_topo_attrs.json 的区别在于“attrs”中增加了 seg_id，代表该属性值所处的分段号（从 0 开始，可以从 attrs_distribution_describe.json 获得属性分段的详细描述信息），即代表该节点的这个属性值满足
$$
left_{seg\_id} < attrs\_value \le right_{seg\_id}
$$
第 0 个区间的左端为闭区间，其余为左开右闭区间



