
import { _decorator, Component, Node, resources, Prefab, instantiate, Vec3, LineComponent } from 'cc';
import { BaseTower } from './BaseTower';
import { getPathByBulletType } from '../TowerUtils';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = LaserTower
 * DateTime = Wed Jan 26 2022 15:13:03 GMT+0800 (中国标准时间)
 * Author = easyStIck
 * FileBasename = LaserTower.ts
 * FileBasenameNoExtension = LaserTower
 * URL = db://assets/Scripts/Tower/LaserTower.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 
@ccclass('LaserTower')
export class LaserTower extends BaseTower {
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
        this.NormalBehavior(this)
    }

    startAtk(){
        super.startAtk()
        if (this.laserInstance!=null){
            this.laserInstance.active = true
            this.initLaserInstance()
        }
        let bulletPath = getPathByBulletType(this.Type)
        console.error("laserpath ",bulletPath)
        if (this.laserPrefab==null){
            resources.load(bulletPath.valueOf(),Prefab,(error,bulletPrefab)=>{
                this.laserPrefab = bulletPrefab
                this.laserInstance = instantiate(this.laserPrefab)
                this.initLaserInstance()
            })
        }else{
            this.laserInstance = instantiate(this.laserPrefab)
            this.initLaserInstance()
        }
    }

    initLaserInstance(){
        console.log("发射激光")
        let line:LineComponent = this.laserInstance.getComponent(LineComponent)
        line.positions = [this.node.worldPosition,this.atkMonster.node.worldPosition] as never[]
    }

    stopAtk(){
        super.stopAtk()
        if (this.laserInstance){
            this.laserInstance.active = false
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
