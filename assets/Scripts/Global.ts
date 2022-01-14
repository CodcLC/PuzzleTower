import { _decorator, Component, Node, instantiate, loader, resources, Prefab, Asset } from 'cc';
import { CSingleton } from './Public/CSingleton';
import { MapTilesManager } from './Tower/Map/MapTiles';
const { ccclass, property } = _decorator;

@ccclass('Global')
export class Global extends CSingleton{
    @property({type:MapTilesManager})
    mapTilesManager:MapTilesManager
}
