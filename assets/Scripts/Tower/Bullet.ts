
import { _decorator, Component, Node, Vec3, tween } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Bullet
 * DateTime = Mon Jan 10 2022 18:37:54 GMT+0800 (中国标准时间)
 * Author = easyStIck
 * FileBasename = Bullet.ts
 * FileBasenameNoExtension = Bullet
 * URL = db://assets/Scripts/Public/Tower/Bullet.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 
@ccclass('Bullet')
export class Bullet extends Component {

    /** 伤害 */
    @property
    damage = 0;

    /**速度 */
    @property
    speed = 0;

    /** 发射子弹单位 */
    @property({type:Node})
    owner;

    /**目标位置*/
    @property({type:Vec3,group:"header"})
    targetPos:Vec3;

    /**目标节点 */
    @property({type:Node})
    target:Node;

    start () {

        // [3]
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    /**
     * 设置数据
     */
    Init({damage = 0,targetPos=null,target}){
        this.damage = damage;
        this.targetPos = targetPos;
        this.target = target;
    }

    public action () {
        tween(this.node)
        .to(1,{worldPosition: this.target?this.target.worldPosition:this.targetPos})
        .call(this.reach)
        .start()
    }

    reach (){
        console.log("命中目标！")
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
