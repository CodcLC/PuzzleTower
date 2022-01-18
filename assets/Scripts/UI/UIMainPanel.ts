/*
 * @Author: your name
 * @Date: 2022-01-15 20:15:50
 * @LastEditTime: 2022-01-16 17:57:45
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \PuzzleTower\assets\Scripts\UI\UIUIUIMainPanel.ts
 */

import { _decorator, Component, Node, resources, Prefab, instantiate } from 'cc';
import { TowerType, UITowerItemPath } from '../Tower/TowerDefines';
import { UITowerItem } from './UITowerItem';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = UIMainPanel
 * DateTime = Fri Jan 14 2022 18:56:22 GMT+0800 (中国标准时间)
 * Author = easyStIck
 * FileBasename = UIMainPanel.ts
 * FileBasenameNoExtension = UIMainPanel
 * URL = db://assets/Scripts/UI/UIMainPanel.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 
@ccclass('UIMainPanel')
export class UIMainPanel extends Component {
    @property({type:Node})
    towerGrid

    @property({type:Prefab})
    towerItemPrefab
    public towerItems = new Map<TowerType,UITowerItem>();
    start () {
        // [3]
        this.initTowerGrid();
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    initTowerGrid(){
        for(var item in TowerType){
            let towerType = Number(item)
            if (!isNaN(towerType)) {
                this.instantialTower(towerType);
            }
        }
    }

    instantialTower(towerType:TowerType){
        var towerItem:Node = instantiate(this.towerItemPrefab);
        this.towerItems[towerType] = towerItem
        let uiTowerItem = towerItem.getComponent(UITowerItem);
        uiTowerItem.init(towerType)
        towerItem.setParent(this.towerGrid)
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
