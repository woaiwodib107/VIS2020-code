# 数据格式说明

压缩包内共有 5 份 json 数据，分别为 5 个服务器的 trade 关系图数据

点数如下：

|           | trade_graph 点数 |
| --------- | ---------------- |
| 服务器 1  | 60478            |
| 服务器 4  | 45687            |
| 服务器 42 | 40657            |
| 服务器 84 | 61351            |
| 服务器 86 | 72043            |



Json 内的数据格式如下：

```json
{
	id1 : {
		"gw_emb": [d_1, ..., d_128],
		"pca": [d_1, d_2]
	},
	...
}
```



点数的 id 与之前计算出拓扑特征的数据一致，由于此次计算的是 embedding ，故另存为一个文件

gw_emb 对应的是一个 128 维的列表，代表该 id 对应点的 node_embedding，是利用 graphwave 计算出来的

参见 https://github.com/benedekrozemberczki/GraphWaveMachine

pca 对应的是一个 2 维的列表，是利用 sklearn 中的 PCA 计算出来的，代表该 id 对应点投影到二维平面上的坐标



