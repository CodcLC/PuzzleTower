
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = UITowerITem
 * DateTime = Fri Jan 14 2022 18:56:39 GMT+0800 (中国标准时间)
 * Author = easyStIck
 * FileBasename = UITowerITem.ts
 * FileBasenameNoExtension = UITowerITem
 * URL = db://assets/Scripts/UI/UITowerITem.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 
@ccclass('UITowerITem')
export class UITowerITem extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    onLoad() {
        this.node.on(Node.EventType.TOUCH_START,this.onTouchStart)
        this.node.on(Node.EventType.TOUCH_MOVE,this.onTouchMove)
        this.node.on(Node.EventType.TOUCH_CANCEL,this.onMouseUp)
    }

    start () {
        // [3]
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    onTouchStart(){
        console.error("touchStart")
    }

    onTouchMove(){
        console.error("touchMove")

    }

    onMouseUp(){
        console.error("touchEnd")

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
