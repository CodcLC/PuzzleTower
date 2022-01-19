
import { _decorator, Component, Node, CCClass, find, EventTouch, Vec2, Vec3 } from 'cc';
import { ChessNode } from './ChessNode';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = NewComponent
 * DateTime = Sat Jan 08 2022 15:37:12 GMT+0800 (中国标准时间)
 * Author = liuyoucai
 * FileBasename = NewComponent.ts
 * FileBasenameNoExtension = NewComponent
 * URL = db://assets/Scripts/NewComponent.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 
@ccclass('Combination')
export class Combination extends Component {

    touchStartPos:Vec2;
    touchEndPos:Vec2;

    start () {

    }

    public setCurTouchChessNode(index:number)
    {
        
    }
    update (deltaTime: number) {
        // [4]
    }



    onTouchStart(event:EventTouch){
        this.touchStartPos = event.getLocation();     
        
    }

    onTouchMove(event:EventTouch){
        var curTouchPos = event.getLocation();
    }

    onSwitch(){
        
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
