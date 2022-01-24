
import { _decorator, Component, Node, Vec3, tween, Tween } from 'cc';
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
    speed:number = 1;

    /** 发射子弹单位 */
    @property({type:Node})
    owner:Node;

    /**目标位置*/
    @property({type:Vec3,group:"header"})
    targetPos:Vec3;

    /**目标节点 */
    @property({type:Node})
    target:Node;


    completeFunc:Function
    completeFuncCaller:Object

    //是否动画
    canAnim:boolean = false

    tweenObject:Tween<Node>

    start () {

        // [3]
    }

    update (deltaTime: number) {
        // [4]
        if (this.canAnim == false){
            return
        }
        let offset:Vec3 = new Vec3()
        Vec3.subtract(offset,this.target.worldPosition,this.node.worldPosition)
        
        if(offset.length()<1){
            console.log("击中目标")
            this.stopAction()
            this.completeFunc.call(this.completeFuncCaller,this)
        }else{
            let dirNomalizeOffset:Vec3 = offset.normalize()
            let moveOffset = dirNomalizeOffset.multiplyScalar(this.speed*100*deltaTime)
            this.node.setWorldPosition(this.node.worldPosition.add(moveOffset))
        }
            // this.tweenObject = tween(this.node)
            // .to(1,{worldPosition: this.target?this.target.worldPosition:this.targetPos})
            // .call(()=>{this.completeFunc.call(this.completeFuncCaller,this)})
            // .start()
    }

    /**
     * 设置数据
     */
    Init({owner = null, damage = 0,targetPos=null,target}){
        this.owner = owner
        this.damage = damage;
        this.targetPos = targetPos;
        this.target = target;
    }

    public action (callBack:Function,caller:Object) {
        this.completeFunc = callBack
        this.completeFuncCaller = caller
        this.canAnim = true
        this.node.setWorldPosition(this.owner.worldPosition)
    }

    public stopAction(){
        this.canAnim = false
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
