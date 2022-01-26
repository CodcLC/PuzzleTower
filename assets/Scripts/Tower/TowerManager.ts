/*
 * @Author: your name
 * @Date: 2022-01-15 20:15:50
 * @LastEditTime: 2022-01-16 20:45:06
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \PuzzleTower\assets\Scripts\Tower\TowerManager.ts
 */

import { _decorator, Component, Node, instantiate, loader, resources, Prefab, Asset } from 'cc';
import { BaseTower } from './Tower/BaseTower';
import { TowerPath, TowerState, TowerType } from './TowerDefines';
import { getPathByTowerType } from './TowerUtils';
import { MapTile } from './Map/MapTile';
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

    //塔预制体
    towerPrefabs = new Map<TowerType,Prefab>();

    /**塔对象容器 */
    towerDict = {};

    private baseId = 0;

    start () {
        // [3]
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    /**
     * 
     * @param type  塔类型
     */
    public addTower(type:TowerType,tile:MapTile){
        let towerPath = getPathByTowerType(type);
        if( this.towerPrefabs.has(type)){
            this.instantialTower(type,tile);
        }
        else{
            resources.load(towerPath.valueOf(),Prefab,(error,prefab)=>{
                this.towerPrefabs.set(type,prefab);
                this.instantialTower(type,tile);
            })
        }
    }

    /**实例化塔 */
    private instantialTower(type:TowerType,tile:MapTile){
        if (!this.towerPrefabs.has(type)) {
            console.log("没有加载成功类型{0}塔预制体！".format(type))
            return
        }
        var towerPrefab = this.towerPrefabs.get(type)
        var towerInstance:Node = instantiate(towerPrefab);
        let baseTower = towerInstance.getComponent(BaseTower);
        this.baseId+=1;
        baseTower.id = this.baseId;
        baseTower.Type = type
        baseTower.state = TowerState.Normal
        this.node.addChild(towerInstance);
        baseTower.Tile = tile
        return towerInstance
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
