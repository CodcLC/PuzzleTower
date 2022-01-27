
import { _decorator, Component, Node, macro, Prefab, resources, instantiate } from 'cc';
import { BaseTower } from './BaseTower';
import { getPathByBulletType } from '../TowerUtils';
import { Bullet } from '../Bullet';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = BulletTower
 * DateTime = Wed Jan 26 2022 15:13:03 GMT+0800 (中国标准时间)
 * Author = easyStIck
 * FileBasename = BulletTower.ts
 * FileBasenameNoExtension = BulletTower
 * URL = db://assets/Scripts/Tower/BulletTower.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 
@ccclass('BulletTower')
export class BulletTower extends BaseTower {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    start () {
        super.start()
    }

    update (deltaTime: number) {
        super.update(deltaTime)
        this.NormalBehavior(this)
    }

    /**
     * 开始攻击
     */
    startAtk(){
        if(this.atkSchedule != null){
            this.unschedule(this.atkSchedule)
        }
        this.atkSchedule = this.schedule(()=>{this.atkAction()},1,macro.REPEAT_FOREVER)
    }


    //攻击动作
    atkAction(){
        if (this.atkMonster == null){
            return
        }
        let bulletPath = getPathByBulletType(this.Type)
        if (this.bulletPrefab==null){
            resources.load(bulletPath.valueOf(),Prefab,(error,bulletPrefab)=>{
                this.bulletPrefab = bulletPrefab
                this.createBulletInstance()
            })
        }else{
            this.createBulletInstance()
        }
        
    }
    
    /**
     * 停止攻击
     */
    stopAtk(){
        if(this.atkSchedule!=null){
            this.unschedule(this.atkSchedule)
            this.atkSchedule = null
        }
    }

    /**
     * 生成子弹
     * @returns 
     */
    createBulletInstance(){
        if (this.bulletPrefab == null) {
            return
        }
        console.log("发射子弹")
        let bulletInstance
        if (this.bulletPool.size() > 0) {
            bulletInstance = this.bulletPool.get();
        } else {
            bulletInstance = instantiate(this.bulletPrefab);
        }
        let bullet:Bullet = bulletInstance.getComponent(Bullet)
        bullet.Init({owner:this.node, damage:1,target:this.atkMonster.node})
        bulletInstance.setParent(this.node)
        bullet.action(this.reclaimBullet,this)
    }

    /**
     * 回收子弹
     * @param bullet 
     */
    public reclaimBullet(bullet:Bullet){
        this.bulletPool.put(bullet.node)
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
