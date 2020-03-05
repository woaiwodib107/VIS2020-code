import { observable, action } from "mobx";
class MainStore {
  @observable selectedNodes = []; //attr[]
  @action setNodes(nodes) {
    this.selectedNodes = nodes;
  }
  @observable nodesList = ["42300604419"]; //id[]
  @action setNodesList(nodes) {
    this.nodesList = nodes;
  }
}
export default MainStore;
