/*
 * @Author: your name
 * @Date: 2022-01-15 20:15:50
 * @LastEditTime: 2022-01-16 19:19:17
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \PuzzleTower\assets\Scripts\Tower\Map\MapTiles.ts
 */
import { _decorator, Component, Node, instantiate, loader, resources, Prefab, Asset } from 'cc';
import { MapTile } from './MapTile';
const { ccclass, property } = _decorator;

@ccclass('MapTilesManager')
export class MapTilesManager extends Component {
    @property
    tiles = new Map<string,MapTile>();

    onLoad(){
        this.InitTiles()
    }
    
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
    

    /**
     * 检测是否在瓦片范围内
     * @param position 
     */
    public CheckOnTile(position):MapTile|void{
        var containTile
        this.tiles.forEach((tile:MapTile,key:string) => {
            if (tile.isInRange(position) == true)
            {
                containTile = tile
            }
        })
        return containTile
    }
}