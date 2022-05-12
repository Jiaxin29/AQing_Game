import { DegreesToVectors } from "../../../Modules/GlobalFunction";
import { Skill_Base } from "../Skill/Skill_Base";
import EnemyBaseNode from "./EnemyBaseNode";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AQing extends EnemyBaseNode {
    @property(cc.Prefab)
    public skill_E: cc.Prefab = null  // 楔子

    @property(cc.Prefab)
    public skill_Q: cc.Prefab = null  // 形体

    onLoad () {
        super.onLoad()
        this.characterName = 'AQing'
        this.life = 20
	}

    start () {

    }

    // 技能1
    useSkill_E() {
        console.log('useSkill_E')
        let skill_E = cc.instantiate(this.skill_E)
        skill_E.parent = this.node.parent 
        skill_E.position = this.node.position
        skill_E.getComponent(Skill_Base).showSkill(this.node, this.aim, this.useSkill_E_End.bind(this))
        this.moveSpeed = 10
    }

    useSkill_E_End() {
        this.moveSpeed = 100
        this.skillIntervalTime = 3
        this.isCanAttack = true
    }
    
    // 技能2
    useSkill_Q() {
        console.log('useSkill_Q')
        let skill_Q = cc.instantiate(this.skill_Q)
        skill_Q.parent = this.node.parent
        skill_Q.position = this.node.position
        skill_Q.getComponent(Skill_Base).showSkill(this.node, this.aim, this.useSkill_Q_End.bind(this))
        this.stopMove()
    }

    useSkill_Q_End() {
        this.moveSpeed = 100
        this.skillIntervalTime = 3
        this.isCanAttack = true
    }

    // update (dt) {}
}
