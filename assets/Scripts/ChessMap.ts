
import { _decorator, Component, Node, find, game, Prefab, Game, ResolutionPolicy, random, math, instantiate, log } from 'cc';
const { ccclass, property } = _decorator;
import { ChessNode } from './ChessNode';
import { GameConfig, ChessType, ChessState, ChessMapState } from './DataStruct';
/**
 * Predefined variables
 * Name = ChessMap
 * DateTime = Tue Jan 11 2022 23:03:53 GMT+0800 (中国标准时间)
 * Author = liuyoucai
 * FileBasename = ChessMap.ts
 * FileBasenameNoExtension = ChessMap
 * URL = db://assets/Scripts/ChessMap.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 
@ccclass('ChessMap')
export class ChessMap extends Component {
    public static mapState:ChessMapState = ChessMapState.Active;
    public static chessNodes:ChessNode[][] = Array<Array<ChessNode>>();
    public static chessNodesObject:Node[][] = Array<Array<Node>>();

    @property([Prefab])
    public chessPrefabs:Prefab[] = Array<Prefab>();



    onLoad(){
        log("加载棋盘");
        this.initChessNodes();
    }
    
    initChessNodes(){
        for(var r = 0;r<GameConfig.GAME_ROW_NUM;++r){
            ChessMap.chessNodesObject[r] = Array<Node>();
            ChessMap.chessNodes[r] = Array<ChessNode>();
            for(var c = 0;c<GameConfig.GAME_COL_NUM;++c){
                ChessMap.chessNodesObject[r][c] = this.createChess(r,c);
                ChessMap.chessNodes[r][c] = ChessMap.chessNodesObject[r][c].getComponent(ChessNode);
                this.node.addChild(ChessMap.chessNodesObject[r][c]);
                ChessMap.chessNodes[r][c].coord.row = r;
                ChessMap.chessNodes[r][c].coord.col = c;
            }
        }
        ChessNode.touchAvaliableDis = (ChessMap.chessNodes[1][0].node.getPosition().x - ChessMap.chessNodes[0][0].node.getPosition().x) / 5;
    } 

    public static checkCombination(){
        for(var r=0;r<GameConfig.GAME_ROW_NUM - 2;++r){
            for(var c=0;c<GameConfig.GAME_COL_NUM - 2;++c){
                if(ChessMap.chessNodes[r][c].type == ChessMap.chessNodes[r][c+1].type && ChessMap.chessNodes[r][c+1].type == ChessMap.chessNodes[r][c+2].type ){
                    ChessMap.chessNodes[r][c].setState(ChessState.Combinationing);
                    ChessMap.chessNodes[r][c+1].setState(ChessState.Combinationing);
                    ChessMap.chessNodes[r][c+2].setState(ChessState.Combinationing);
                }
                if(ChessMap.chessNodes[r][c].type == ChessMap.chessNodes[r+1][c].type && ChessMap.chessNodes[r+1][c].type == ChessMap.chessNodes[r+2][c].type ){
                    ChessMap.chessNodes[r][c].setState(ChessState.Combinationing);
                    ChessMap.chessNodes[r+1][c].setState(ChessState.Combinationing);
                    ChessMap.chessNodes[r+2][c].setState(ChessState.Combinationing);
                }
            }
        }
    }

    drop(row:number,col:number,horizontal:boolean,combinationNum:number){
        if(horizontal){
            for(var c = col; c < col+combinationNum; ++c){
                for(var r = 0;r<row;++r){
                    ChessMap.chessNodes[r][c].setMoveDestinationNode(ChessMap.chessNodes[r+1][c]);
                }
            }
        }
        else{
            for(var r = 0;r<row;++r){
                ChessMap.chessNodes[r][col].setMoveDestinationNode(ChessMap.chessNodes[r + combinationNum][c]);
            }
        }

    }


    public createChess(row:number,col:number):Node{
        var denyType1,denyType2;
        if(row-2 >= 0){
            if(ChessMap.chessNodes[row - 1][col].type == ChessMap.chessNodes[row - 2][col].type){
                denyType1 = ChessMap.chessNodes[row - 2][col].type;
            }
        }
        
        if(col-2 >= 0){
            if(ChessMap.chessNodes[row][col - 2].type == ChessMap.chessNodes[row][col - 1].type){
                denyType2 = ChessMap.chessNodes[row][col - 2].type;
            }
        }

        var randomPool:Array<ChessType> = [];
        for(var t = ChessType.Yellow;t<ChessType.ChessTypeNum;++t){
            if(t!=denyType1 && t!=denyType2){
                randomPool.push(t);
            }
        }
        return instantiate(this.chessPrefabs[randomPool[math.randomRangeInt(0,randomPool.length)]]);
    }
    // update (deltaTime: number) {
    //     // [4]
    // }
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
