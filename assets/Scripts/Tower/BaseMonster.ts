/*
 * @Author: your name
 * @Date: 2022-01-08 20:08:27
 * @LastEditTime: 2022-01-16 19:36:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \PuzzleTower\assets\Scripts\Battle\BaseMonster.ts
 */

import { _decorator, Component, Node, Tween, tween } from 'cc';
import { Global } from '../Global';
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
 
@ccclass('BaseMonster')
export class BaseMonster extends Component { 

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


    //移动速度
    @property
    private speed = 0;
    public get Speed() {
        return this.speed;
    }
    public set Speed(value) {
        this.speed = value;
    }

    private pathPointIndex = 0
    private tween

    onLoad(){
        console.error("load")
    }

    start () {
        // [3]
        console.error("start")

    }

    checkMove(){
        this.tween = null
        let path = Global.Instance<Global>().path
        if(!path.isFinalPoint(this.pathPointIndex)){
            this.pathPointIndex+=1
            this.move()
        }
    }

    move(){
        if(this.tween!=null){
            return
        }
        let path = Global.Instance<Global>().path
        let pathPoint = path.PassPoints[this.pathPointIndex]
        console.error(pathPoint)
        this.tween = tween(this.node)
        .to(1,{position:pathPoint})
        .call(()=>{
            console.error("到达 ",pathPoint)
            this.checkMove()
        })
        .start()
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
