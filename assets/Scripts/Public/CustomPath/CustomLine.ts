
 import { _decorator, Component, Node, Graphics, UITransform } from 'cc';
 const { ccclass, property } = _decorator;
/**
 * Predefined variables
 * Name = CustomLine
 * DateTime = Tue Jan 18 2022 14:20:22 GMT+0800 (中国标准时间)
 * Author = easyStIck
 * FileBasename = CustomLine.ts
 * FileBasenameNoExtension = CustomLine
 * URL = db://assets/Scripts/Public/CustomPath/CustomLine.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 

 
 @ccclass('CustomLine')
 export class CustomLine  {
    @property({type:Node})
    startNode:Node 

    @property({type:Node})
    targetNode:Node

    @property({type:Node})
    ctrl1:Node

    @property({type:Node})
    ctrl2:Node

    // public get UiTrans():UITransform{
    //     if (this.uiTrans == null){
    //         this.uiTrans = this.getComponent(UITransform)
    //     }
    //     return this.uiTrans
    // }

    // private uiTrans:UITransform

    onLoad(){

    }

    start(){

    }

    public init(startNode,targetNode,ctrl1,ctrl2){
        this.startNode = startNode 
        this.targetNode = targetNode 
        this.ctrl1 = ctrl1 
        this.ctrl2 = ctrl2 
    }

    public destroy(destroyStart){
        if (destroyStart == true){
            this.startNode.destroy()
        }
        this.targetNode.destroy()
        this.ctrl1.destroy()
        this.ctrl2.destroy()        
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
