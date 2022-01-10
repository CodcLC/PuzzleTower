
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

    @property
    speed = 0;

    @property({type:Node})
    owner;

    @property()
    target:Vec3|Node;

    start () {

        // [3]
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    action () {
        tween(this.node)
       
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
