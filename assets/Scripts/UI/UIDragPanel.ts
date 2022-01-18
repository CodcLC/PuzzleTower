/*
 * @Author: your name
 * @Date: 2022-01-15 20:15:50
 * @LastEditTime: 2022-01-16 19:37:13
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \PuzzleTower\assets\Scripts\UI\UIDragPanel.ts
 */

import { _decorator, Component, Node, resources, Prefab, instantiate, isValid, UITransform, Vec3, Vec2 } from 'cc';
import { TowerType, UITowerItemPath } from '../Tower/TowerDefines';
import { UITowerItem } from './UITowerItem';
import { getPathByTowerType } from '../Tower/TowerUtils';
import { Global } from '../Global';
import { MapTilesManager } from '../Tower/Map/MapTiles';
import { MapTile } from '../Tower/Map/MapTile';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = DragPanel
 * DateTime = Fri Jan 14 2022 18:56:22 GMT+0800 (中国标准时间)
 * Author = easyStIck
 * FileBasename = DragPanel.ts
 * FileBasenameNoExtension = DragPanel
 * URL = db://assets/Scripts/UI/DragPanel.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 
@ccclass('UIDragPanel')
export class UIDragPanel extends Component {

    //塔预制体
    towerDragNodes = new Map<TowerType,Node>();

    /**
     * 拖拽中
     */
    dragging = false
    /**
     * 
     * @param type  塔类型
     */
    public startDragTower(type){
        let towerPath = getPathByTowerType(type);
        this.dragging = true
        if( !this.towerDragNodes.has(type)){
            resources.load(towerPath.valueOf(),Prefab,(error,prefab)=>{
                var towerInstance = instantiate(prefab);
                this.towerDragNodes.set(type,towerInstance)
                this.initDragTower(type);
            })
        }
        else{
            this.initDragTower(type);
        }
    }

    public setDragPos(type,position:Vec2){
        let towerDragInstance = this.towerDragNodes.get(type)
        if(towerDragInstance!=null)
        {
            let dragPos = new Vec3(position.x,position.y,0)

            let touchWorldPos=Global.Instance<Global>().camera.screenToWorld(dragPos);
            let localPosition = Global.Instance<Global>().camera.convertToUINode(touchWorldPos,this.node)
            towerDragInstance.position = localPosition
            // console.log(dragPos,towerDragInstance.position)
        }
    }

    public endDragTower(type){
        let towerDragInstance = this.towerDragNodes.get(type)
        let tile = Global.Instance<Global>().mapTilesManager.CheckOnTile(towerDragInstance.worldPosition)
        if (tile == null)
        {
            //重置拖拽
            
        }else{
            //放置成功
            Global.Instance<Global>().towerManager.addTower(type,tile as MapTile) 
        }
        this.cancelDragTower(type)
        console.error(tile)
    }

    /**
     * 移除拖拽中的塔
     * @param type 
     */
    public cancelDragTower(type){
        let towerDragInstance = this.towerDragNodes.get(type)
        towerDragInstance.active = false
        this.dragging = false
    }

    /**实例化拖拽中的塔 */
    private initDragTower(type:TowerType){
        let towerDragInstance = this.towerDragNodes.get(type)
        if (towerDragInstance == null)
        {
            return;
        }
        towerDragInstance.active = true;
        this.node.addChild(towerDragInstance);
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
