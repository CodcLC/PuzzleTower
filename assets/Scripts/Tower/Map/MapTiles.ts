import { _decorator, Component, Node, instantiate, loader, resources, Prefab, Asset } from 'cc';
import { MapTile } from './MapTile';
const { ccclass, property } = _decorator;

@ccclass('MapTilesManager')
export class MapTilesManager extends Component {
    @property
    tiles = new Map<string,MapTile>();
    
    public EnTile(mapTile:MapTile){
        this.tiles.set("",mapTile)
    }

    public AddTile(id:number){

    }

    public InitTiles(){
        var childTiles = this.node.getComponentsInChildren(MapTile)
        for (var index in childTiles){
            this.EnTile(childTiles[index])
        }

    
    }
}