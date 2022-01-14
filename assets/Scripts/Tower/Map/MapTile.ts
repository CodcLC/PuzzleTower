import { _decorator, Component, Node, instantiate, loader, resources, Prefab, Asset } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MapTile')
export class MapTile extends Component {
    @property
    x:number = 0;

    @property
    y:number = 0;


}