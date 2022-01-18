/*
 * @Author: your name
 * @Date: 2022-01-15 20:15:50
 * @LastEditTime: 2022-01-16 18:52:37
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \PuzzleTower\assets\Scripts\Public\Singleton\CSingleton.ts
 */
import { Component, game } from "cc";

export class CSingleton<T> extends Component {

    static _instance

    static Instance<T>():T{
      return this._instance;
    }

    onLoad(){
      CSingleton._instance = this
      
      game.addPersistRootNode(this.node)
    }

    /**
     * @returns
     */
    public static getInstance<T>():T{
      return this._instance
    }
} 