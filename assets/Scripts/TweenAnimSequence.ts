
import { _decorator, Component, Node, Tween } from 'cc';
import { ChessMap } from './ChessMap';
import { ChessMapState } from './DataStruct';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = TweenAnimSequence
 * DateTime = Sun Jan 16 2022 19:07:58 GMT+0800 (中国标准时间)
 * Author = liuyoucai
 * FileBasename = TweenAnimSequence.ts
 * FileBasenameNoExtension = TweenAnimSequence
 * URL = db://assets/Scripts/TweenAnimSequence.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */

export class TweenAnimSequence{
    public animArr:Tween<Node>[] = Array<Tween<Node>>();

    run(callBack:Function){
        var tweenArr = this.animArr;
        if(tweenArr == null || tweenArr.length<=0){
            callBack();
            return;
        }
        var tweenSequence = this;
        tweenArr[tweenArr.length-1].start().call(function(){
            tweenArr.pop();
            tweenSequence.run(callBack);
            ChessMap.mapState = ChessMapState.NotOperational;
        });
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
