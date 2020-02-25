# 基本信息统计

该数据集为玩家的画像特征，其中部分特征可作为 groundtruth 使用。

无向图

|           | friend_graph（点数，边数） | chat_graph（点数，边数） | trade_graph（点数，边数） |
| --------- | -------------------------- | ------------------------ | ------------------------- |
| 服务器 1  | （69334，751972）          | （71816，2122025）       | （60478，402623）         |
| 服务器 4  | （52293，546169）          | （54356，1437447）       | （45687，239404）         |
| 服务器 42 | （57693，582852）          | （53020，1293968）       | （40657，231312）         |
| 服务器 84 | （83291，800111）          | （75264，1641215）       | （61351，344295）         |
| 服务器 86 | （94699，735229）          | （86356，1678650）       | （72043，346585）         |

# 相关说明

## 格式

```json
{
  "nodes":[
    {
      "id": 1
      "edges": [2,3,4],
      "attrs": {"ban_status": 0, "bhgx": 0.35, "role_agi": 1.86, ...},
  		"topo_attrs": {"degree": 1, "betweenness": 0.5, ...}
    },
    ...
  ],
 "links":[
    {"source": 1, "target": 2},
    ...
  ] 
}
```



## 字段解释

### attrs

| columns                       | 特征           | 补充说明               |
| ----------------------------- | :------------- | :--------------------- |
| role_id                       | 角色id         | 键                     |
| ban_status                    | 封禁           | 未封停为 0，已封停为 1 |
| bhgx                          | 帮会贡献       |                        |
| charging_level                | 充值等级       | 0~5，逐级提高          |
| ck_yin_liang                  | 库存银两       |                        |
| create_date                   | 角色创建日期   | 年月日                 |
| del_status                    | 账号状态       | 0正常，1已注销         |
| display_memory_localized_size | 显存           |                        |
| guild_id                      | 帮会 id        | 可能可以用作社团检测   |
| jj                            | 军阶           |                        |
| kjjf                          | 科举积分       | 游戏玩法               |
| liang_shi                     | 良师值         |                        |
| os_name                       | 操作系统名称   |                        |
| os_version                    | 操作系统版本   |                        |
| physical_memory_size          | 内存           |                        |
| punish_cnt                    | 惩罚           | 可能可以用于异常检测   |
| qldb                          | 甜水巷代币     |                        |
| role_agi                      | 角色身法       |                        |
| role_base_score               | 角色基础评分   |                        |
| role_class                    | 角色职业       |                        |
| role_cor                      | 角色根骨       |                        |
| role_equip_score              | 角色装备评分   |                        |
| role_gender                   | 角色性别       | 男为 1，女为 0         |
| role_int                      | 角色气海       |                        |
| role_level                    | 角色等级       |                        |
| role_practice_score           | 角色修炼评分   |                        |
| role_skill_score              | 角色技能评分   |                        |
| role_sta                      | 角色耐力       |                        |
| role_str                      | 角色力量       |                        |
| role_talisman_score           | 角色法宝评分   |                        |
| role_total_score              | 角色职业总评分 | (主要指标)             |
| role_wuxue_score              | 角色武学评分   |                        |
| server                        | 角色所在服务器 |                        |
| sjtxjf                        | 试剑天下积分   | 游戏玩法               |
| ttsw                          | 论文声望       |                        |
| yin_liang                     | 可能是银两     |                        |

### topo_attrs

| columns                 | 特征                               |
| ----------------------- | :--------------------------------- |
| degree                  | 节点的度（与该节点相连的边的数目） |
| betweenness_centrality  | 介数中心性                         |
| eigenvector_centrality  | 特征向量中心性                     |
| pagerank                | 节点的 PageRank 值                 |
| clustering_coefficient  | 集聚系数                           |
| average_neighbor_degree | 邻居的平均度数                     |