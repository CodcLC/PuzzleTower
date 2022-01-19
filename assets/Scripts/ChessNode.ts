
import { _decorator, Component, Node, EventTouch, Vec2, Sprite, Vec3, math, Enum, log, tween, Tween } from 'cc';
import { Combination } from './Combination';
import { ChessType, Coordinate, ChessState, GameConfig, ChessMapState } from './DataStruct';
import { ChessMap } from './ChessMap';
import { TweenAnimSequence } from './TweenAnimSequence';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = ChessNode
 * DateTime = Tue Jan 04 2022 21:39:52 GMT+0800 (中国标准时间)
 * Author = liuyoucai
 * FileBasename = ChessNode.ts
 * FileBasenameNoExtension = ChessNode
 * URL = db://assets/Scripts/ChessNode.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 

@ccclass('ChessNode')
export class ChessNode extends Component {
    @property({type :Enum(ChessType),displayName:"棋子类型"})
    public type:ChessType = ChessType.Yellow;
    public coord:Coordinate = new Coordinate();

    public static touchAvaliableDis:number;
    chessState:ChessState;
    sprite:Sprite;
    combination:Combination;

    moveSpeed:number = 10;
    combinationSpeed:number = 10;
    destinationChessNode:ChessNode;
    startMovePos:Vec3;
    animSequence:TweenAnimSequence;

    public remove(switchNode:ChessNode) {
        this.setState(ChessState.Combinationing);
    }

    public setMoveDestinationNode(destinationNode:ChessNode)
    {
        this.setState(ChessState.Moving);
        this.destinationChessNode = destinationNode;
        this.startMovePos = this.node.getPosition();
    }

    public setState(state:ChessState){
        this.chessState = state;
    }

    public addAnim(tween:Tween<Node>){
        this.animSequence.animArr.push(tween);
    }

    public playAnim(){
        this.animSequence.animArr.reverse();
        this.animSequence.run(function(){
            ChessMap.mapState = ChessMapState.NotOperational;
        });
    }

    onLoad(){
        this.initEvent();
    }

    start () {
        this.chessState = ChessState.Active;
        this.combination = this.node.parent.getComponent(Combination);
        this.sprite = this.getComponent(Sprite);
    }
    
    initEvent(){
        this.node.on(Node.EventType.TOUCH_MOVE,this.touchMove,this);
    }

    tweenToPos(pos:Vec3)
    {
        var chessNode = this;
        this.addAnim(tween(this.node).to(1,{position:pos}).stop().call(function(){
            chessNode.setState(ChessState.Active);
            ChessMap.mapState = ChessMapState.Active;
            ChessMap.checkCombination();
        }));
    }

    switchNode(destinationNode:ChessNode){
        if(destinationNode != null && this.chessState == ChessState.Active && destinationNode.chessState == ChessState.Active){
            this.setState(ChessState.Moving);
            this.tweenToPos(destinationNode.node.position);
            destinationNode.setState(ChessState.Moving);
            destinationNode.tweenToPos(this.node.position);
            log("交换位置");
        }
    }

    touchMove(event:EventTouch){
        log("触摸移动");
        var movDis = event.getStartLocation().subtract(event.getLocation()).length();
        if(movDis >= ChessNode.touchAvaliableDis && ChessMap.mapState == ChessMapState.Active){
            var MovDir = event.getLocation().subtract(event.getStartLocation()).normalize();
            var destinationNode:ChessNode = null;
            //  倾向于x方向上的移动
            if(Math.abs(MovDir.x) > Math.abs(MovDir.y)) {
                if(MovDir.x>0 && this.coord.col + 1<GameConfig.GAME_COL_NUM && ChessMap.chessNodes[this.coord.row][this.coord.col + 1].type != this.type){
                    destinationNode = ChessMap.chessNodes[this.coord.row][this.coord.col + 1];
                }
                else if(MovDir.x<0 && this.coord.col - 1>=0 && ChessMap.chessNodes[this.coord.row][this.coord.col - 1].type != this.type){
                    destinationNode = ChessMap.chessNodes[this.coord.row][this.coord.col - 1];
                }
            }
            else {
                if(MovDir.y>0 && this.coord.row - 1>=0 && ChessMap.chessNodes[this.coord.row - 1][this.coord.col].type != this.type){
                    destinationNode = ChessMap.chessNodes[this.coord.row - 1][this.coord.col];
                }
                else if(MovDir.y<0 && this.coord.row + 1<GameConfig.GAME_ROW_NUM && ChessMap.chessNodes[this.coord.row + 1][this.coord.col].type != this.type){
                    destinationNode = ChessMap.chessNodes[this.coord.row + 1][this.coord.col];
                }
            }
            this.switchNode(destinationNode);
        }
    }

    onCombination(){
        this.setState(ChessState.Combinationing);
        var chessNode = this;
        tween(this.node).to(1,{scale:new Vec3(0,0,0)}).start().call(function(){
            chessNode.setState(ChessState.Active);
            ChessMap.mapState = ChessMapState.Active;
            ChessMap.checkCombination();
        })
        var startScale = this.node.scale;
        Vec3.lerp(startScale, startScale,new Vec3(0,0,0), this.combinationSpeed*deltaTime);
        this.node.setScale(startScale);
    }

    onMove(deltaTime:number){
        var destinationNodePosition =this.destinationChessNode.node.getPosition();
        Vec3.lerp(this.startMovePos,this.startMovePos,destinationNodePosition, this.moveSpeed*deltaTime);
        this.node.setPosition(this.startMovePos);
    }

    update (deltaTime: number) {
        switch (this.chessState) {
            case ChessState.Moving: {
                this.onMove(deltaTime); 
            }
            break;
            case ChessState.Combinationing:{
                this.onCombination(deltaTime);
            }
            default:
                break;
        }
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
