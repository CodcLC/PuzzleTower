import { Component, game } from "cc";

export class CSingleton extends Component {

    _instance

    onLoad(){
      this._instance = this
      
      game.addPersistRootNode(this.node)
    }

    public getInstance(){
        return this._instance
    }
} 