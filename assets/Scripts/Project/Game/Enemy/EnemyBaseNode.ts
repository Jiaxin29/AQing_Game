import { DegreesToVectors, VectorsToDegrees } from "../../../Modules/GlobalFunction";
import { GameEventEnum, GroupEnum } from "../../Data/EventEnum";
import { GameEvent } from "../../Main/EventDispatcher";
import Character from "../Basics/Character"
import Skill_AQing_E from "../Skill/Skill_AQing_E";
import { Skill_Base } from "../Skill/Skill_Base";

const {ccclass, property} = cc._decorator;

@ccclass
export default class EnemyBaseNode extends Character {
    public hand: cc.Node = null
    public aim: cc.Node = null  // 攻击目标
    public attackLength: number = 300  // 攻击距离

    // 使用技能间隔时间
    public skillIntervalTime: number = 3

    onLoad () {
        super.onLoad()
        this.hand = this.node.getChildByName('hand')
	}

    start () {
        super.start()
    }
    
    onBeginContact(contact, selfCollider, otherCollider) {
        // 被玩家打到
        if (selfCollider == this.characterCollider && otherCollider.node.group == GroupEnum.Hero_Bullet) {
            this.hurt()
            GameEvent.emit(GameEventEnum.ATTACK_TO_ENEMY_SUCCESS, this.node)
            otherCollider.node.destroy()
            contact.disabled = true
            return
        }
    }

    hurt() {
        this.currentLife--
    }
    // onEndContact(contact, selfCollider, otherCollider) {
        
    // }

    // 移动到目标
    moveToAim(dt) {
        let wPos = this.aim.parent.convertToWorldSpaceAR(this.aim.position)
        let meWPos = this.node.parent.convertToWorldSpaceAR(this.node.position)
        let dir = wPos.sub(meWPos)
        dir = dir.normalizeSelf()
        this.velocity.x = dir.x
        this.velocity.y = dir.y

        this.rigidbody.linearVelocity = this.velocity.mul(this.moveSpeed)
        // this.node.angle = VectorsToDegrees(this.velocity)
        this.node.scaleX = this.velocity.x >= 0 ? 1 : -1
    }

    // 停止移动
    stopMove() {
        this.moveSpeed = 0
        this.rigidbody.linearVelocity = cc.Vec2.ZERO
    }

    startMove() {
        this.moveSpeed = this.maxMoveSpeed
    }

    // 检测状态
    checkState(dt) {
        if (!this.aim) {
            return
        }

        this.skillIntervalTime -= dt
        if (this.skillIntervalTime <= 0) {
            this.useSkill(dt)
            this.skillIntervalTime = 99
        } else {
            let len = this.aim.parent.convertToWorldSpaceAR(this.aim.position).sub(this.node.parent.convertToWorldSpaceAR(this.node.position)).len()
            if (this.isCanAttack && len <= this.attackLength) {
                this.attackAim(dt)
            } else {
                this.moveToAim(dt)
            }
        }
    }

    update (dt) {
        this.checkState(dt)
    } 

    // 攻击目标
    attackAim(dt) {

    }

    // 使用技能
    useSkill(dt) {
        this.isCanAttack = false
        this.useSkill_E()
        return
        
        if (Math.random() > 0.3) {
            this.useSkill_E()
        } else {
            this.useSkill_Q()
        }
    }

    // 使用e技能
    useSkill_E() {

    }

    // e技能结束
    useSkill_E_End() {

    }

    // 使用q技能
    useSkill_Q() {

    }

    // q技能结束
    useSkill_Q_End() {

    } 
}
