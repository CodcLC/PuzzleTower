/*
 * @Author: your name
 * @Date: 2022-01-15 20:15:50
 * @LastEditTime: 2022-01-16 19:25:03
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \PuzzleTower\assets\Scripts\Global.ts
 */
import { _decorator, Component, Node, instantiate, loader, resources, Prefab, Asset, UITransform, Camera } from 'cc';
import { CSingleton } from './Public/Singleton/CSingleton';
import { MapTilesManager } from './Tower/Map/MapTiles';
import { UIDragPanel } from './UI/UIDragPanel';
import { TowerManager } from './Tower/TowerManager';
import { MonsterManager } from './Tower/MonsterManager';
import { CustomPath } from './Public/CustomPath/CustomPath';
const { ccclass, property } = _decorator;

@ccclass('Global')
export class Global extends CSingleton<Global>{

    @property({type:Camera})
    camera:Camera

    @property({type:UITransform})
    uiRootTrans:UITransform

    //塔瓦片管理
    @property({type:MapTilesManager})
    mapTilesManager:MapTilesManager

    //塔单位管理
    @property({type:TowerManager})
    towerManager:TowerManager

    //怪物单位管理
    @property({type:MonsterManager})
    monsterManager:MonsterManager

    //路径信息
    @property(CustomPath)
    path:CustomPath

    @property({type:UIDragPanel})
    uiDragPanel:UIDragPanel
}
