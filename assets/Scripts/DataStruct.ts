
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = DataStruct
 * DateTime = Tue Jan 04 2022 21:57:51 GMT+0800 (中国标准时间)
 * Author = liuyoucai
 * FileBasename = DataStruct.ts
 * FileBasenameNoExtension = DataStruct
 * URL = db://assets/Scripts/DataStruct.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 /**
 * 组合类型
 */
export enum CombinationType {
    Horizontal = 0, // 横型
    Vertical, // 竖型
    Cross, // 十字型
    TShape, // T 型
    LShape, // L 型
}
export enum ChessType{
    Yellow = 0,
    Blue,
    Red,

    ChessTypeNum
}

export enum ChessState{
    Active = 0,
    CanRemove,
    Combinationing,
    Generating,
    Moving,
}

export enum ChessMapState{
    Active = 0,
    NotOperational,

}

export class Coordinate{
    public col:number;
    public row:number;
    

}

export class GameConfig{
    public static GAME_ROW_NUM = 8;
    public static GAME_COL_NUM = 8;
    public static GAME_CHESS_TYPE_NUM = 3;
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
