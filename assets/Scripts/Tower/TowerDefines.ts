/*
 * @Author: your name
 * @Date: 2022-01-15 20:15:50
 * @LastEditTime: 2022-01-15 22:41:27
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \PuzzleTower\assets\Scripts\Tower\TowerDefines.ts
 */
import { CCObject, Component } from "cc";
import { BaseTower } from "./Tower/BaseTower";
import { BulletTower } from './Tower/BulletTower';
import { LaserTower as LaserTower } from './Tower/LaserTower';
import { BenefitTower } from './Tower/BenefitTower';


//塔类型
export enum TowerType {
    Circle,
    Square,
    Triangle,
}

export enum TowerState{
    Disable,
    Normal,
    Attack,

}

export enum BenefitType{
    None,
    Speed,
}

//塔名字
export const TowerNameMap = new Map<TowerType,String>([
    [TowerType.Circle,"圆塔"],
    [TowerType.Square,"正方塔"],
    [TowerType.Triangle,"三角塔"],
]);

//塔预制体
export const TowerPrefabMap = new Map<TowerType,String>([
    [TowerType.Circle,"BulletTower"],
    [TowerType.Square,"LaserTower"],
    [TowerType.Triangle,"BenefitTower"],
]);

//塔组件类
export const TowerClassType = new Map<TowerType,Object>([
    [TowerType.Circle,BulletTower],
    [TowerType.Square,LaserTower],
    [TowerType.Triangle,BenefitTower],
]);


//怪物定义
export enum MonsterType{
    Test = "Test",
}


//资源模板地址
export const TowerPath = "Prefabs/Tower/{0}"
//怪物路径
export const MonsterPath = "Prefabs/Monster/{0}"

//子弹路径
export const BulletPath = "Prefabs/Bullet/{0}"

//激光路径
export const LaserPath = "Prefabs/Bullet/{0}"

//TowerItem预制体地址
export const UITowerItemPath = "Prefabs/Tower/UI/UITowerItem.prefab"
