/*
 * @Author: your name
 * @Date: 2022-01-15 20:15:50
 * @LastEditTime: 2022-01-15 22:41:27
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \PuzzleTower\assets\Scripts\Tower\TowerDefines.ts
 */
import { CCObject, Component } from "cc";
import { BaseTower } from "./BaseTower";


//塔类型
export enum TowerType {
    Circle,
    Square,
    Triangle,
}

//塔名字
export const TowerNameMap = new Map<TowerType,String>([
    [TowerType.Circle,"圆塔"],
    [TowerType.Square,"正方塔"],
    [TowerType.Triangle,"三角塔"],
]);

//塔预制体
export const TowerPrefabMap = new Map<TowerType,String>([
    [TowerType.Circle,"BaseTower"],
    [TowerType.Square,"BaseTower"],
    [TowerType.Triangle,"BaseTower"],
]);

//塔组件类
export const TowerClassType = new Map<TowerType,Object>([
    [TowerType.Circle,BaseTower],
]);


//怪物定义
export enum MonsterType{
    Test = "Test",
}


//资源模板地址
export const TowerPath = "Prefabs/Tower/{0}"
//怪物路径
export const MonsterPath = "Prefabs/Monster/{0}"
//TowerItem预制体地址
export const UITowerItemPath = "Prefabs/Tower/UI/UITowerItem.prefab"
