/*
 * @Author: your name
 * @Date: 2022-01-15 20:15:50
 * @LastEditTime: 2022-01-15 22:37:55
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \PuzzleTower\assets\Scripts\Tower\TowerUtils.ts
 */
import { BaseTower } from "./BaseTower";
import { MonsterPath, MonsterType, TowerPath as TowerTempPath, TowerPrefabMap } from './TowerDefines';

export function getPathByTowerType(towerType){
    let prefabName = TowerPrefabMap.get(towerType)
    var towerPath = TowerTempPath.format(prefabName)
    return towerPath
}

export function getPathByMonsterType(monsterType){
    let prefabName = monsterType
    var towerPath = MonsterPath.format(prefabName)
    return towerPath
}
