
 import { _decorator, Component, Node, Graphics, UITransform, Vec3, Color } from 'cc';
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

    passPoints:Vec3[] = []


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

    /**
     * 创建经过的点位
     * @param uiTrans 
     * @param pointsAmount 
     * @param graphics 
     * @returns 
     */
    public CreateBezierPoints(uiTrans:UITransform,pointsAmount:number,graphics)
    {
        this.passPoints = []
        let startPos = uiTrans.convertToNodeSpaceAR(this.startNode.worldPosition)
        let endPos = uiTrans.convertToNodeSpaceAR(this.targetNode.worldPosition)
        let ctr1Pos = uiTrans.convertToNodeSpaceAR(this.ctrl1.worldPosition)
        let ctr2Pos = uiTrans.convertToNodeSpaceAR(this.ctrl2.worldPosition)
        let points = [startPos,ctr1Pos,ctr2Pos,endPos]
        for (var i = 0; i < pointsAmount; i++) {
            let t = i/pointsAmount
            const x = startPos.x * (1 - t) * (1 - t) * (1 - t) + 3 * ctr1Pos.x * t * (1 - t) * (1 - t) + 3 * ctr2Pos.x * t * t * (1 - t) + endPos.x * t * t * t;
            const y = startPos.y * (1 - t) * (1 - t) * (1 - t) + 3 * ctr1Pos.y * t * (1 - t) * (1 - t) + 3 * ctr2Pos.y * t * t * (1 - t) + endPos.y * t * t * t;
            var point = new Vec3(x,y,0)
            if (i == 0){
                graphics.moveTo(point.x,point.y)
            }else{
                graphics.color = Color.BLUE
                graphics.lineWidth = 10
                graphics.lineTo(point.x,point.y)
                graphics.stroke()
                graphics.moveTo(point.x,point.y)
                
            }
            let worldPos = uiTrans.convertToWorldSpaceAR(point)
            this.passPoints.push( worldPos);
        }
        
        return this.passPoints;
 
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
