import { BaseTower } from "./BaseTower";
import { TowerPath as TowerTempPath } from "./TowerDefines";

export function getPathByTowerType(towerType){
    var towerPath = TowerTempPath.format(towerType)
    return towerPath
}