import { GameEventEnum } from "../../../Data/EventEnum";
import { GameEvent } from "../../../Main/EventDispatcher";
import { Skill_Base } from "../../Skill/Skill_Base";
import EnemyBaseNode from "../EnemyBaseNode";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AQing extends EnemyBaseNode {
    @property(cc.Prefab)
    public skill_E: cc.Prefab = null  // 楔子

    @property(cc.Prefab)
    public skill_Q: cc.Prefab = null  // 形体

    @property(cc.Prefab)
    public bullet: cc.Prefab = null  // 攻击

    public attackIntervalTime: number = 0.12  // 一次攻击完成时间，有两次，前摇后摇
    public attackIntervalDelayTime: number = 0.2  // 攻击完成后延迟时间

    onLoad () {
        super.onLoad()
        this.characterName = 'AQing'
        this.life = 20
        this.maxMoveSpeed = 300
	}

    start () {
        super.start()
    }

    // 攻击
    attackAim(dt) {
        console.log('[AQing] attackAim')

        this.isCanAttack = false
        this.stopMove()
        let dir = this.velocity.x > 0 ? cc.v3(1, 0) : cc.v3(-1, 0)
        if (this.aim) {
            let aimWPos = this.aim.parent.convertToWorldSpaceAR(this.aim.position)
            dir = aimWPos.sub(this.node.parent.convertToWorldSpaceAR(this.node.position)).normalize()
        }

        GameEvent.emit(GameEventEnum.ATTACK_TO_HERO, this.node, this.aim, this.bullet)
        this.velocity = cc.v2(0, 0)

        cc.Tween.stopAllByTarget(this.hand)
        cc.tween(this.hand).to(this.attackIntervalTime, {angle: -137 + 30}).to(this.attackIntervalTime, {angle: -137 + -30}).delay(this.attackIntervalDelayTime).call(()=>{
            this.isCanAttack = true
            this.startMove()
        }).start()
    }
    
    // 使用技能
    useSkill(dt) {
        this.isCanAttack = false
        if (Math.random() > 0.3) {
            this.useSkill_E()
        } else {
            this.useSkill_Q()
        }
    }

    // 技能1
    useSkill_E() {
        console.log('[AQing] useSkill_E')
        let skill_E = cc.instantiate(this.skill_E)
        skill_E.parent = this.node.parent 
        skill_E.position = this.node.position
        skill_E.getComponent(Skill_Base).showSkill(this.node, this.aim, this.useSkill_E_End.bind(this))
        this.moveSpeed = 10
    }

    useSkill_E_End() {
        this.moveSpeed = this.maxMoveSpeed
        this.skillIntervalTime = 3
        this.isCanAttack = true
    }
    
    // 技能2
    useSkill_Q() {
        console.log('[AQing] useSkill_Q')
        let skill_Q = cc.instantiate(this.skill_Q)
        skill_Q.parent = this.node.parent
        skill_Q.position = this.node.position
        skill_Q.getComponent(Skill_Base).showSkill(this.node, this.aim, this.useSkill_Q_End.bind(this))
        this.stopMove()
    }

    useSkill_Q_End() {
        this.moveSpeed = this.maxMoveSpeed
        this.skillIntervalTime = 3
        this.isCanAttack = true
    }

    // update (dt) {}
}
