/*
 * @Author: your name
 * @Date: 2022-01-15 20:15:50
 * @LastEditTime: 2022-01-16 19:36:06
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE{}
 * @FilePath: \PuzzleTower\assets\Scripts\Tower\Map\MapTile.ts
 */
import { _decorator, Component, Node, instantiate, loader, resources, Prefab, Asset, UITransform, Rect } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MapTile')
export class MapTile extends Component {
    @property
    x:number = 0;

    @property
    y:number = 0;

    
    public uiTrans:UITransform

    start(){
        this.uiTrans = this.node.getComponent(UITransform)
    }


    public isInRange(position):boolean{
        let bound = this.uiTrans.getBoundingBoxToWorld()
        let inRange = bound.contains(position)
        return inRange
    }
}