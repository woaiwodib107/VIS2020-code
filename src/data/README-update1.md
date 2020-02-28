## attrs_distribution_topo_data 文件夹

attrs_distribution_describe.json 文件描述了属性分布的相关信息，暂时只选择了部分属性

选择的 4 服务器和 42 服务器上的数据

格式如下

```json
{
  "attrs_name":{
    "num": total_segment_number,
    "seg": [[left0, right0], [left1, right1], ...]
    "local_4": [number_belong_to_seg_0, number_belong_to_seg_1, ...],
    "local_42": [number_belong_to_seg_0, number_belong_to_seg_1, ...],
    "global_4_42": [number_belong_to_seg_0, number_belong_to_seg_1, ...]
  }
}
```

其中，num 代表将该属性分成的段数，seg 描述了分段左右端点的情况

local_4，local_42 分别代表 4 和 42 服务器上对应属性在各段上的数目

global_4_42 为 4 和 42 两个服务器的所有数据的上对应属性在各段上的数目

