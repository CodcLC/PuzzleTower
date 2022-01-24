/*
 * @Author: your name
 * @Date: 2022-01-15 20:15:50
 * @LastEditTime: 2022-01-16 19:06:24
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \PuzzleTower\assets\Scripts\UI\UITowerItem.ts
 */

import { _decorator, Component, Node, RichText, Label, Prefab, resources, instantiate, isUnicodeSpace, isValid } from 'cc';
import { TowerType, TowerNameMap } from '../Tower/TowerDefines';
import { getPathByTowerType } from '../Tower/TowerUtils';
import { Global } from '../Global';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = UITowerITem
 * DateTime = Fri Jan 14 2022 18:56:39 GMT+0800 (中国标准时间)
 * Author = easyStIck
 * FileBasename = UITowerITem.ts
 * FileBasenameNoExtension = UITowerITem
 * URL = db://assets/Scripts/UI/UITowerITem.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 
@ccclass('UITowerItem')
export class UITowerItem extends Component {

    private towerType = 0
    public get TowerType() {
        return this.towerType;
    }
    public set TowerType(value) {
        this.towerType = value;
    }

    @property({type:Label})
    nameText:Label = null


    onLoad() {
        this.node.on(Node.EventType.TOUCH_START,this.onTouchStart,this)
        this.node.on(Node.EventType.TOUCH_MOVE,this.onTouchMove,this)
        this.node.on(Node.EventType.TOUCH_CANCEL,this.onTouchCancel,this)
        this.node.on(Node.EventType.TOUCH_END,this.onTouchEnd,this)
    }

    start () {
        // [3]
    }

    init (towerType) {
        this.towerType = towerType
        let name = TowerNameMap.get(this.towerType)
        this.nameText.string = name.toString()
    }

   
    // update (deltaTime: number) {
    //     // [4]
    // }

    onTouchStart(){
        console.error("touchStart")
    }


    onTouchMove(touchEvent){
        // console.error("touchMove")
        let global:Global = Global.Instance<Global>()
        if (!global.uiDragPanel.dragging){
            global.uiDragPanel.startDragTower(this.towerType)
            
        }else{
            let location = touchEvent.getLocation();
            global.uiDragPanel.setDragPos(this.towerType,location)
        }
    }

    onTouchEnd(touchEvent){
        console.error("onTouchEnd")
        Global.Instance<Global>().uiDragPanel.cancelDragTower(this.towerType)
    }

    /**
     * 拖动结束在节点外 检测是否拖动到塔的瓦片
     * @param touchEvent 
     */
    onTouchCancel(touchEvent){
        console.error("onTouchCancel")
        Global.Instance<Global>().uiDragPanel.endDragTower(this.towerType)
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
