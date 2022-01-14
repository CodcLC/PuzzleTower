import { _decorator, Component, Node, instantiate, loader, resources, Prefab, Asset } from 'cc';
import { singleton } from './Public/Singleton';
import { MapTilesManager } from './Tower/Map/MapTiles';
const { ccclass, property } = _decorator;

@ccclass('Global')
class Global {

    mapTilesManager:MapTilesManager
}

export const GlobalSingleton = singleton(Global)