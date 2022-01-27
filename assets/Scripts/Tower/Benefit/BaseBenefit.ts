
import { _decorator, Component, Node } from 'cc';
import { BenefitType } from '../TowerDefines';
import { BaseMonster } from '../BaseMonster';
import { BaseTower } from '../Tower/BaseTower';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = BaseBenefit
 * DateTime = Thu Jan 27 2022 15:54:21 GMT+0800 (中国标准时间)
 * Author = easyStIck
 * FileBasename = BaseBenefit.ts
 * FileBasenameNoExtension = BaseBenefit
 * URL = db://assets/Scripts/Tower/Benefit/BaseBenefit.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('BaseBenefit')
export class BaseBenefit {
    type:BenefitType = BenefitType.None
    source:Node = null
    value:number = 0

    constructor(type:BenefitType,source:Node,value:number){
        this.type = type
        this.source = source
        this.value = value
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/en/scripting/decorator.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/en/scripting/life-cycle-callbacks.html
 */
