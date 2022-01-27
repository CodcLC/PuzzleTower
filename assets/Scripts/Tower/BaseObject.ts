import { _decorator, Component, Node } from 'cc';
import { BaseBenefit } from './Benefit/BaseBenefit';
import { BenefitType } from './TowerDefines';
const { ccclass, property } = _decorator;

@ccclass('BaseObject')
export class BaseObject extends Component {
    //增益
    benefits:Array<BaseBenefit> = new Array<BaseBenefit>();

    /**
     * 增加增益
     * @param benefit 
     */
    addBenefit(benefit:BaseBenefit){
        if (benefit.type!=BenefitType.None){
            this.benefits.push(benefit)
        }
    }

    /**
     * 增加增益
     * @param benefit 
     */
    addBenefitAttr(type:BenefitType,source:Node,value:number){
        let benefit = new BaseBenefit(type,source,value)
        this.addBenefit(benefit)
    }

    /**
     * 移除增益
     * @param benefit 
     */
    removeBenefit(benefit:BaseBenefit){
        if (benefit.type!=BenefitType.None){
            let index = this.benefits.indexOf(benefit)
            if (index>-1){
                this.benefits.splice(index,1)
            }
        }
    }

    /**
     * 移除对应来源的benefit
     */
    removeBenefitBySource(source:Node){
        let benefits = new Array<BaseBenefit>()
        this.benefits.forEach((benefit)=>{
            if(benefit.source != source){
                benefits.push(benefit)
            }
        })
        this.benefits = benefits
    }

    /**
     * 通过增益类型获取增益
     * @param type 
     */
    getBenefitByType(type:BenefitType):Array<BaseBenefit>{
        let benefits = new Array<BaseBenefit>()
        this.benefits.forEach((benefit)=>{
            if(benefit.type == type){
                benefits.push(benefit)
            }
        })
        return benefits
    }

    /**
     * 通过增益类型获取增益值
     * @param type 
     */
    getBenefitValueByType(type:BenefitType):number{
        let benefitValue = 0
        this.benefits.forEach((benefit)=>{
            if(benefit.type == type){
                benefitValue+=benefit.value
            }
        })
        return benefitValue
    }

    /**
     * 获取对应来源的benefit
     */
    getBenefitBySource(source:Node):Array<BaseBenefit>{
        let benefits = new Array<BaseBenefit>()
        this.benefits.forEach((benefit)=>{
            if(benefit.source == source){
                benefits.push(benefit)
            }
        })
        return benefits
    }
}