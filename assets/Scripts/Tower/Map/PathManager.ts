// /// <reference types='@types/node' />
import { _decorator, Component, Node, Vec3, resources, TextAsset } from 'cc';
import { table } from 'console';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = PathManager
 * DateTime = Thu Jan 20 2022 19:09:29 GMT+0800 (中国标准时间)
 * Author = easyStIck
 * FileBasename = PathManager.ts
 * FileBasenameNoExtension = PathManager
 * URL = db://assets/Scripts/Tower/Map/PathManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 
@ccclass('PathManager')
export class PathManager extends Component {
    
    public points:Array<Vec3> = new Array<Vec3>()

    onLoad () {
        // [3]
        this.loadPath()
    }


    loadPath(){
        // let fs = require('fs')
        let pathStr = "Path/path_test"
        resources.load(pathStr,(error,file:TextAsset)=>{
            if (file.text==""){
                return
            }
            var posArray = file.text.split("|")
            posArray.forEach((posStr)=>{
                let posInfo = posStr.split(' ')
                let pos:Vec3 = new Vec3(Number(posInfo[0]),Number(posInfo[1]),Number(posInfo[2]))
                this.points.push(pos)
            })            
        })
        // jsb.fileUtils.getStringFromFile(pathStr)
        // fs.readFile(pathStr,{flag:'w'},(error,str)=>{
        //     console.error("read path success!!!!!!! ",str)
        // })
    }

        /**
     * 是否是路径上最后一个点
     * @param index 
     * @returns 
     */
    public isFinalPoint(index):boolean{
        return index >= this.points.length-1
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/en/scripting/life-cycle-callbacks.html
 */
