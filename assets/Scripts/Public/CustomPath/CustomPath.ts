
import { _decorator, Component, Node, Graphics, tween, TweenSystem, Tween, Color, find, Camera, UITransform, Vec3, Sprite, Vec2, Size, resources, assetManager, SpriteFrame } from 'cc';
import { EDITOR } from 'cc/env';
import { CustomLine } from './CustomLine';
import { Dragable } from './Dragable';
const { ccclass, property,executeInEditMode } = _decorator;

/**
 * Predefined variables
 * Name = CustomPath
 * DateTime = Tue Jan 18 2022 11:07:12 GMT+0800 (中国标准时间)
 * Author = easyStIck
 * FileBasename = CustomPath.ts
 * FileBasenameNoExtension = CustomPath
 * URL = db://assets/Scripts/Public/CustomPath/CustomPath.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */

@ccclass('CustomPath')
@executeInEditMode
export class CustomPath extends Component {
    

    
    points:Vec3[] = new Array<Vec3>()

    @property([Vec3])
    public get Points(){
        return this.points
    }
    
    public set Points(value){
        this.points = value
        this.initLines()
    }

    @property(Array(CustomLine))
    customLines = new Array<CustomLine>()

    

    graphic:Graphics
    uiTrans:UITransform
    spriteFrame:SpriteFrame
    start () {
        resources.load("Arts/ChessImg/Chess1",SpriteFrame,(error,spriteFrame)=>{
            this.spriteFrame = spriteFrame
        })
        this.graphic = this.node.getComponent(Graphics)
        this.uiTrans = this.graphic.getComponent(UITransform)

        this.customLines.forEach((customLine)=>{
            this._registerLineEvent(customLine)
        })

        this._drawAllLines()
        console.error("start")
    }


    onEnable(){
        if (this.graphic == null){
            this.graphic = this.node.getComponent(Graphics)
        }
        this._drawAllLines()
    }
    
    // update (deltaTime: number) {
    //     // [4]
    // }

    onDestroy(){
        this.customLines.forEach((customLine) => {
            this._unregisterNodeEvent(customLine);
        });
    }

    _registerLineEvent(customLine:CustomLine){
        [
            this.node,
            customLine.startNode,
            customLine.targetNode,
            customLine.ctrl1,
            customLine.ctrl2
        ].forEach((node)=>{
            node.on(Node.EventType.TRANSFORM_CHANGED,()=>{this.onTransfomrChanged(customLine)})
        })
    }


    _unregisterNodeEvent(customLine:CustomLine) {
        [
            this.node,
            customLine.startNode,
            customLine.targetNode,
            customLine.ctrl1,
            customLine.ctrl2
        ].forEach((node)=>{
            node.targetOff(this)
        })
    }

    initLines(){
        var lastPointNode:Node,lastCtrlNode:Node
        var lineCount = 0
        for(let i =0;i<this.points.length;i++){
            let point = this.points[i]
            if(i==0){
                if (this.points.length>=2){
                    let customLine = this.customLines[0]
                    if(customLine == null){
                        var lastPointNode = this._createPoint(i,point)
                        var lastCtrlNode = this._createCtrl(i,point)
                        lastCtrlNode.setParent(lastPointNode)
                    }else{
                        lastPointNode = customLine.startNode
                        lastCtrlNode = customLine.ctrl1
                    }
                } 
            }
            else{
                let customLine = this.customLines[i-1]
                if(customLine==null){
                    customLine = new CustomLine()
                    this.customLines.push(customLine)
                    var pointNode = this._createPoint(i,point)
                    var ctrlNode = this._createCtrl(i,point)
                    ctrlNode.setParent(pointNode)
                }else{
                    pointNode = customLine.targetNode
                    ctrlNode = customLine.ctrl2
                }
                
                if(lineCount!=0)
                {
                    var ctrl1Node = this._createCtrl(i,point)
                    ctrl1Node.setParent(lastPointNode)
                }else{
                    ctrl1Node = lastCtrlNode
                }

                customLine.init(lastPointNode,pointNode,ctrl1Node,ctrlNode)
                this._registerLineEvent(customLine)
                lastPointNode = pointNode
                lastCtrlNode = ctrlNode
                lineCount+=1
            }

        }
        this._drawAllLines()
    }

    _createPoint(i,pointPos:Vec3):Node{
        let pointNode = new Node("point"+i)
        let pointUiTrans = pointNode.addComponent(UITransform)
        pointUiTrans.contentSize = new Size(50,50)
        let pointSprite = pointNode.addComponent(Sprite)
        pointSprite.spriteFrame = this.spriteFrame
        pointSprite.color = Color.BLUE
        pointNode.setParent(this.node)
        pointNode.setWorldPosition(pointPos)
        return pointNode
    }

    _createCtrl(i,pointPos:Vec3):Node{
        let ctrlNode = new Node("ctrl"+i)
        let ctrlUiTrans = ctrlNode.addComponent(UITransform)
        ctrlUiTrans.contentSize = new Size(50,50)
        let ctrlSprite = ctrlNode.addComponent(Sprite)
        ctrlSprite.spriteFrame = this.spriteFrame
        ctrlSprite.color = Color.RED
        ctrlNode.setWorldPosition(pointPos.add(new Vec3(0,100,0)))
        return ctrlNode
    }


    onTransfomrChanged(customLine:CustomLine){
        this._drawAllLines()   
    }

    _drawAllLines(){
        this.graphic.clear();
        this.customLines.forEach((customLine) => {
            this._drawOneBezier(customLine);    
        });
    }

    /**
     * 绘制贝塞尔线
     * @param customLine 
     */
    _drawOneBezier(customLine:CustomLine) {
        //转换到当前坐标系下
        let startPos = this.uiTrans.convertToNodeSpaceAR(customLine.startNode.worldPosition)
        let endPos = this.uiTrans.convertToNodeSpaceAR(customLine.targetNode.worldPosition)
        let ctr1Pos = this.uiTrans.convertToNodeSpaceAR(customLine.ctrl1.worldPosition)
        let ctr2Pos = this.uiTrans.convertToNodeSpaceAR(customLine.ctrl2.worldPosition)

        this._drawLine(startPos,  ctr1Pos,  Color.RED);
        this._drawLine(endPos, ctr2Pos, Color.RED);
        this.graphic.strokeColor = Color.YELLOW;
        this.graphic.lineWidth = 8;
        this.graphic.moveTo(startPos.x, startPos.y);
        this.graphic.bezierCurveTo(
            ctr1Pos.x, ctr1Pos.y, 
            ctr2Pos.x, ctr2Pos.y, 
            endPos.x, endPos.y
        );
        this.graphic.stroke();
    }

    /**
     * 画线
     * @param start 
     * @param end 
     * @param color 
     */
    _drawLine(start:Vec3,end:Vec3,color:Color){
        this.graphic.strokeColor = color
        this.graphic.lineWidth = 4
        this.graphic.moveTo(start.x,start.y)
        this.graphic.lineTo(end.x,end.y)
        this.graphic.stroke()
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
