import React from "react";
import Bar from './Bar/index.js'
import { randomData } from "../data/raw";

class Charts extends React.Component {
  constructor(props) {
    super(props);
    const segment = 10;
    let groups = randomData();
    let data = [];
    let keys = Object.keys(groups[0][0]);
    let obj = {};
    keys.forEach(key => {
      console.log(key);
      obj[key] = [];
      groups.forEach(group => {
        group.forEach(user => {
          obj[key].push(user[key]);
        });
      });
    });
    this.resultDataArr = [];
    let { resultDataArr } = this;
    console.log("obj:", obj);

    Object.keys(obj).forEach(key => {
      const arr = obj[key];
      if (typeof arr[0] !== "string") {
        const max = Math.max(...arr);
        const min = Math.min(...arr);
        let r = {};
        const l = (max - min) / segment;
        arr.forEach(d => {
          const s = Math.floor((d - min) / l);
          if (!(s in r)) {
            r[s] = 0;
          }
          r[s] += 1;
        });
        const result = Object.entries(r).map(d => {
          let e = {};
          e["state"] = `${l * parseInt(d[0]) + min}-${l * parseInt(d[0]) +
            2 * min -
            1}`;
          e["count"] = d[1];
          return e;
        });
        resultDataArr.push({ keys: ["count"], data: result });
      } else {
        let r = {};
        arr.forEach(d => {
          if (!(d in r)) {
            r[d] = 0;
          }
          r[d] += 1;
        });
        const result = Object.entries(r).map(d => {
          let e = {};
          e["state"] = d[0];
          e["count"] = d[1];
          return e;
        });
        resultDataArr.push({ keys: ["count"], data: result });
      }
    });
    console.log("resultDataArr:", resultDataArr);

    const clientNo = Math.floor(Math.random() * groups.length);
    const userNo = Math.floor(Math.random() * groups[0].length);
    console.log("clintNo: ", clientNo);
    console.log("userNo: ", userNo);
    let selectUser = groups[clientNo][userNo];
    let userData = { data: [], keys: ["local", "global", "diff"] };

    keys.forEach((key, i) => {
      const arr = obj[key];
      let globalKeyCount = 0;
      let localKeyCount;
      let globalCount = resultDataArr[i]["data"].reduce((prev, cur) => {
        return cur["count"] + prev;
      }, 0);
      if (typeof arr[0] == "string") {
        console.log(key);
        for (let k = 0; k < resultDataArr[i]["data"].length; k++) {
          if (resultDataArr[i]["data"][k].key === selectUser[key]) {
            globalKeyCount = resultDataArr[i]["data"][k]["count"];
          }
        }
        localKeyCount = groups[clientNo].reduce((prev, cur) => {
          return cur[key] === selectUser[key] ? prev + 1 : prev;
        }, 0);
      } else {
        console.log(key);
        const max = Math.max(...arr);
        const min = Math.min(...arr);
        const l = (max - min) / segment;
        let index = Math.floor((selectUser[key] - min) / l);
        if (index === segment) index -= 1;
        const left = min + l * index;
        const right = min + l * (index + 1);
        console.log("index: ", index, resultDataArr[i]["data"][index]);
        globalKeyCount = resultDataArr[i]["data"][index]["count"];
        localKeyCount = groups[clientNo].reduce((prev, cur) => {
          return cur[key] >= left && cur[key] < right ? prev + 1 : prev;
        }, 0);
      }
      let globalProp = (100 * globalKeyCount) / globalCount;
      let localProp = (100 * localKeyCount) / groups[0].length;
      if (globalProp > localProp) {
        let diff = globalProp - localProp;
        userData["data"].push({
          state: key + ": " + selectUser[key],
          global: 0,
          local: localProp,
          diff: diff
        });
      } else {
        let diff = localProp - globalProp;
        userData["data"].push({
          state: key + ": " + selectUser[key],
          global: globalProp,
          local: 0,
          diff: diff
        });
      }
    });
    resultDataArr.unshift(userData);
  }
  render() {
    let customerData = this.resultDataArr[0]
    console.log(customerData)
    return (
      <div
        style={{
          height: 500,
          width: 800,
          padding: "20px",
          display: "grid",
          gridTemplateColumns: "auto auto",
          gridTemplateRows: "auto",
          gridGap: "10px"
        }}
      >
        {this.resultDataArr.map((r, i) => {
          return (
            <div style={{ height: 250, border:'1px solid #e8e8e8' }} key={i}>
              <Bar width={300} height={200} data={r.data}/>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Charts;
