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
    private alertRange = 200;
    @property
    public get AlertRange() {
        return this.alertRange;
    }
    public set AlertRange(value) {
        this.alertRange = value;
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

    bulletPrefab:Prefab
    bulletPool:NodePool

    //警戒范围内的怪物
    alertMonsters = new Array<BaseMonster>()
    removeAlertMonsters = new Array<BaseMonster>()
    newAlertMonsters = new Array<BaseMonster>()
    alert = false

    onLoad(){
    }

    start () {
        //绘制攻击范围
        this.graphic = this.getComponent(Graphics)
        let color = new Color("#95CACA")
        this.graphic.strokeColor = color
        this.graphic.lineWidth = 5
        this.graphic.circle(0,0,this.alertRange)
        this.graphic.stroke()

        this.bulletPool = new NodePool()
    }

    update (deltaTime: number) {
        if(this.state != TowerState.Disable){
            this.UpdateAtkMonsters()
        }
     }

    /**
     * 获取怪物距离
     * @param monster 
     * @returns 
     */
    getMonsterDistance(monster:BaseMonster):number{
        let towerPosition = this.node.worldPosition
        let monsterPos = monster.node.worldPosition
        let distance = Math.sqrt(Math.pow(monsterPos.x-towerPosition.x,2)+Math.pow(monsterPos.y-towerPosition.y,2))
        return distance
    }

    CheckMonsterInAlertRange(monster:BaseMonster):boolean{
        let distance = this.getMonsterDistance(monster)
        if (distance<this.AlertRange){
            return true
        }
        else{
            return false
        }
    }

    /**
     * 更新警戒范围内怪物
     */
    UpdateAtkMonsters(){
        let monsters = Global.Instance<Global>().monsterManager.monsterObjects
        this.removeAlertMonsters.length = 0
        this.newAlertMonsters.length = 0
        let alertMonsters = []
        monsters.forEach((monster)=>{
            let alert = this.CheckMonsterInAlertRange(monster)
            if (alert){
                alertMonsters.push(monster)
                //新加入范围的怪物
                if (!this.alertMonsters.includes(monster)){
                    console.error("新加入范围怪物  ",monster)
                    this.newAlertMonsters.push(monster)
                }
            }else{
                //离开范围的怪物
                if (this.alertMonsters.includes(monster)){
                    this.removeAlertMonsters.push(monster)
                }
            }
        })
        this.alertMonsters = alertMonsters
    }

    /**
     * 更新当前攻击怪物
     * @returns 
     */
    UpdateAtkMonster(){
        let monsters = Global.Instance<Global>().monsterManager.monsterObjects
        let atkMonster,minDistance:number
        this.alertMonsters.forEach((monster)=>{
            let distance = this.getMonsterDistance(monster)
            if (atkMonster == null || distance<minDistance){
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
  

    /**
     * 正常的攻击表现
     * @param tower 
     */
    NormalBehavior(tower:BaseTower) {
        if (this.state == TowerState.Disable){
            return
        }
        let chectResult = this.UpdateAtkMonster()
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
