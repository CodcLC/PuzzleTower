/*
 * @Author: your name
 * @Date: 2022-01-08 20:08:27
 * @LastEditTime: 2022-01-16 19:36:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \PuzzleTower\assets\Scripts\Battle\BaseTower.ts
 */

import { _decorator, Component, Node } from 'cc';
import { MapTile } from './Map/MapTile';
const { ccclass, property } = _decorator;
/**
 * Predefined variables
 * Name = NewComponent
 * DateTime = Sat Jan 08 2022 20:08:27 GMT+0800 (中国标准时间)
 * Author = easyStIck
 * FileBasename = NewComponent.ts
 * FileBasenameNoExtension = NewComponent
 * URL = db://assets/Scripts/NewComponent.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 
@ccclass('BaseTower')
export class BaseTower extends Component { 

    public id = 0;

    //血量
    @property({type:0})
    private hp = 100;
    public get Hp() {
        return this.hp;
    }
    public set Hp(value) {
        this.hp = value;
    }

    //蓝量
    @property
    private mp = 100;
    public get Mp() {
        return this.mp;
    }
    public set Mp(value) {
        this.mp = value;

    }

    //能量
    @property
    private power = 0;
    public get Power() {
        return this.power;
    }
    public set Power(value) {
        this.power = value;
    }

    //攻击
    @property
    private atk = 0;
    public get Atk() {
        return this.atk;
    }
    public set Atk(value) {
        this.atk = value;
    }

    //射程
    @property
    private atkRange = 0;
    public get AtkRange() {
        return this.atkRange;
    }
    public set AtkRange(value) {
        this.atkRange = value;
    }

    //瓦片
    private tile:MapTile
    public get Tile() {
        return this.tile;
    }
    public set Tile(value) {
        this.tile = value;
        this.node.setWorldPosition(this.tile.node.worldPosition)
    }


    onLoad(){
        console.error("load")
    }

    start () {
        // [3]
        console.error("start")

    }

    

    // update (deltaTime: number) {
    //     // [4]
    // }
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
