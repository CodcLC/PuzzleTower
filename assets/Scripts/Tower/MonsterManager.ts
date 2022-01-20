
import { _decorator, Component, Node, Prefab, Vec3, resources, instantiate } from 'cc';
import { BaseMonster } from './BaseMonster';
import { MonsterType, TowerType } from './TowerDefines';
import { getPathByMonsterType } from './TowerUtils';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = MonsterManager
 * DateTime = Thu Jan 20 2022 11:42:58 GMT+0800 (中国标准时间)
 * Author = easyStIck
 * FileBasename = MonsterManager.ts
 * FileBasenameNoExtension = MonsterManager
 * URL = db://assets/Scripts/Tower/MonsterManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 
@ccclass('MonsterManager')
export class MonsterManager extends Component {
    //怪物预制体
    monsterPrefabs = new Map<MonsterType,Prefab>();

    /**怪物对象容器 */
    monsterObjects = new Map<number,BaseMonster>();

    private baseId = 0;

    start () {
        // [3]
        this.addMonster(MonsterType.Test)
        
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    /**
     * 
     * @param type  塔类型
     */
    public addMonster(type:MonsterType):BaseMonster{
        let monsterPath = getPathByMonsterType(type);
        if( this.monsterPrefabs.has(type)){
            return this._instantialMonster(type,new Vec3(0,0,0));
        }
        else{
            resources.load(monsterPath.valueOf(),Prefab,(error,prefab)=>{
                this.monsterPrefabs.set(type,prefab);
                let baseMonster = this._instantialMonster(type,new Vec3(0,0,0));
                baseMonster.checkMove()
                return baseMonster
            })
        }
    }

    /**实例化塔 */
    private _instantialMonster(type:MonsterType,position:Vec3):BaseMonster{
        if (!this.monsterPrefabs.has(type)) {
            console.log("没有加载成功类型{0}塔预制体！".format(type))
            return
        }
        var monsterPrefab = this.monsterPrefabs.get(type)
        var towerInstance:Node = instantiate(monsterPrefab);
        let baseMonster = towerInstance.getComponent(BaseMonster);
        this.baseId+=1;
        baseMonster.id = this.baseId;
        this.monsterObjects.set(baseMonster.id,baseMonster)
        this.node.addChild(towerInstance);
        return baseMonster
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
