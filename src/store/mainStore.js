import { observable, action } from "mobx";
class MainStore {
  @observable selectedNodes = [];
  @action setNodes(nodes) {
    this.selectedNodes = nodes;
  }
}
export default MainStore;