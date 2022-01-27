
import { _decorator, Component, Node, resources, Prefab, instantiate, Vec3, LineComponent, CurveRange, Line } from 'cc';
import { BaseTower } from './BaseTower';
import { getPathByBulletType } from '../TowerUtils';
import { Global } from '../../Global';
import { BaseMonster } from '../BaseMonster';
import { BenefitType } from '../TowerDefines';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = BenefitTower
 * DateTime = Wed Jan 26 2022 15:13:03 GMT+0800 (中国标准时间)
 * Author = easyStIck
 * FileBasename = BenefitTower.ts
 * FileBasenameNoExtension = BenefitTower
 * URL = db://assets/Scripts/Tower/BenefitTower.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 
@ccclass('BenefitTower')
export class BenefitTower extends BaseTower {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    laserInstance:Node

    start () {
        super.start()

    }

    update (deltaTime: number) {
        super.update(deltaTime)
        this.DefendBehavior()
    }

    DefendBehavior(){
        this.alertMonsters.forEach((monster)=>{
            if (monster.getBenefitBySource(this.node).length<=0){
                monster.addBenefitAttr(BenefitType.Speed,this.node,-50)
                console.error("减速！！！！")
            }
        })
        this.removeAlertMonsters.forEach((monster)=>{
            monster.removeBenefitBySource(this.node)
        })
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
