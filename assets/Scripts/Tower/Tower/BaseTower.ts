/*
 * @Author: your name
 * @Date: 2022-01-08 20:08:27
 * @LastEditTime: 2022-01-16 19:36:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \PuzzleTower\assets\Scripts\Battle\BaseTower.ts
 */

import { _decorator, Component, Node, Graphics, Color, math, Tween, tween,macro, instantiate, NodePool, Prefab, resources } from 'cc';
import { create } from 'domain';
import { TowerType, TowerState } from '../TowerDefines';
import { MapTile } from '../Map/MapTile';
import { BaseMonster } from '../BaseMonster';
import { Global } from '../../Global';
import { getPathByBulletType } from '../TowerUtils';
import { Bullet } from '../Bullet';

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
 
 enum CheckMonsterResult{
    No,
    Same,
    Different
}

@ccclass('BaseTower')
export class BaseTower extends Component { 

    public id = 0;

    //类型
    private type:TowerType;
    public get Type() {
        return this.type;
    }
    public set Type(value) {
        this.type = value;
    }

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
    private atkRange = 200;
    @property
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

    //状态
    state:TowerState = TowerState.Disable

    atkMonster:BaseMonster

    graphic:Graphics
    atkSchedule = null

    laserPrefab:Prefab
    bulletPool:NodePool

    alert = false

    onLoad(){
    }

    start () {
        //绘制攻击范围
        this.graphic = this.getComponent(Graphics)
        let color = new Color("#95CACA")
        this.graphic.strokeColor = color
        this.graphic.lineWidth = 5
        this.graphic.circle(0,0,this.atkRange)
        this.graphic.stroke()

        this.bulletPool = new NodePool()
    }



    checkMonstersPosition(){
        let towerPosition = this.node.worldPosition
        let monsters = Global.Instance<Global>().monsterManager.monsterObjects
        let atkMonster,minDistance:number
        monsters.forEach((monster)=>{
            let monsterPos = monster.node.worldPosition
            let distance = Math.sqrt(Math.pow(monsterPos.x-towerPosition.x,2)+Math.pow(monsterPos.y-towerPosition.y,2))
            if ((atkMonster==null && distance<this.AtkRange) || distance<minDistance){
                atkMonster = monster
                minDistance = distance
            }
        })
        if (atkMonster == null){
            console.log("攻击范围内无怪物")
            this.atkMonster = null
            return CheckMonsterResult.No
        }else if(this.atkMonster!=atkMonster){
            console.log("攻击范围内有新的怪物 ",this.atkMonster,atkMonster)
            this.atkMonster = atkMonster
            return CheckMonsterResult.Different
        }else{
            return CheckMonsterResult.Same
        }
    }
    
    /**
     * 开始攻击
     * @returns 
     */
    startAtk(){
        console.error("开始攻击")
        this.state = TowerState.Attack
    }

    /**
     * 结束攻击
     * @returns 
     */
    stopAtk(){
        console.error("结束攻击")
        this.state = TowerState.Normal

    }
  
   

    update (deltaTime: number) {
       
    }

    /**
     * 正常的攻击表现
     * @param tower 
     */
    NormalBehavior(tower:BaseTower) {
        if (this.state == TowerState.Disable){
            return
        }
        let chectResult = this.checkMonstersPosition()
        if(chectResult == CheckMonsterResult.Different){
            tower.stopAtk()
            tower.startAtk()
        }else if (chectResult == CheckMonsterResult.No && this.state == TowerState.Attack){
            tower.stopAtk()
        }else{

        }
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
