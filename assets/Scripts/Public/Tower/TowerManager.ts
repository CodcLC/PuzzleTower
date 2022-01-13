
import { _decorator, Component, Node, instantiate, loader, resources } from 'cc';
import { TowerDefines } from './TowerDefines';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = TowerManager
 * DateTime = Thu Jan 13 2022 18:52:49 GMT+0800 (中国标准时间)
 * Author = easyStIck
 * FileBasename = TowerManager.ts
 * FileBasenameNoExtension = TowerManager
 * URL = db://assets/Scripts/Public/Tower/TowerManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 
@ccclass('TowerManager')
export class TowerManager extends Component {

    /**塔对象容器 */
    towerDict = {};

    start () {
        // [3]
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    addTower(){
        let towetPath = TowerDefines.TowerPath
        let tower = resources.load(,function(){})
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/en/scripting/life-cycle-callbacks.html
 */
