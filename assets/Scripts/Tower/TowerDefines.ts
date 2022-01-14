import { CCObject, Component } from "cc";
import { BaseTower } from "./BaseTower";


//塔类型
export const enum TowerType {
    Base,
}

//塔组件类
export const TowerClassType = new Map<TowerType,Object>([
    [TowerType.Base,BaseTower],
]);

//资源模板地址
export const TowerPath = "Prefabs/Tower/{0}.prefab"

