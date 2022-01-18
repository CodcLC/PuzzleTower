
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Dragable
 * DateTime = Tue Jan 18 2022 11:10:05 GMT+0800 (中国标准时间)
 * Author = easyStIck
 * FileBasename = Dragable.ts
 * FileBasenameNoExtension = Dragable
 * URL = db://assets/Scripts/Public/CustomPath/Dragable.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 
@ccclass('Dragable')
export class Dragable extends Component {
    
    onLoad(){
        this.node.on(Node.EventType.TOUCH_MOVE,this.onTouchMove,this)
    }

    onTouchMove(touchEvent){
        let position = touchEvent.getLocation()
        this.node.position = position
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
