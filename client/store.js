import {action, observable} from 'mobx';

export class Store {
  @observable analyzerData = {};
  @observable projectName = '';
  @observable branchName = '';

  @action setAnalyzerData = (analyzerData) => {
    this.analyzerData = analyzerData;
  }
  @action setProjectName = (projectName) => {
    this.projectName = projectName;
  }
  @action setBranchName = (branchName) => {
    this.branchName = branchName;
  }
}

export const store = new Store();
