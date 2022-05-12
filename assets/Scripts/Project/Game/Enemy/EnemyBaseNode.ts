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
        if (selfCollider instanceof cc.PhysicsBoxCollider && otherCollider.node.group == GroupEnum.Hero_Bullet) {
            this.currentLife--
            GameEvent.emit(GameEventEnum.ATTACK_TO_ENEMY_SUCCESS, this.node)
            otherCollider.node.destroy()
            contact.disabled = true
            return
        }
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

        this.moveSpeed = 100
        this.rigidbody.linearVelocity = this.velocity.mul(this.moveSpeed)
        // this.node.angle = VectorsToDegrees(this.velocity)
        this.node.scaleX = this.velocity.x >= 0 ? 1 : -1
    }

    // 攻击目标
    attackAim(dt) {
        if (!this.isCanAttack) {
            return
        }

        this.isCanAttack = false
        this.stopMove()
        let dir = this.velocity.x > 0 ? cc.v3(1, 0) : cc.v3(-1, 0)
        if (this.aim) {
            let aimWPos = this.aim.parent.convertToWorldSpaceAR(this.aim.position)
            dir = aimWPos.sub(this.node.parent.convertToWorldSpaceAR(this.node.position)).normalize()
        }

        // GameEvent.emit(GameEventEnum.ATTACK_TO_ENEMY, this.node.parent.convertToWorldSpaceAR(this.node.position), dir)
        this.velocity = cc.v2(0, 0)
        cc.tween(this.hand).by(0.1, {angle: 30}).by(0.1, {angle: -30}).call(()=>{
            this.isCanAttack = true
        }).start()
    }

    stopMove() {
        this.moveSpeed = 0
        this.rigidbody.linearVelocity = cc.Vec2.ZERO
    }

    checkAttackType(dt) {
        if (!this.aim) {
            return
        }

        this.skillIntervalTime -= dt
        if (this.skillIntervalTime <= 0) {
            this.useSkill(dt)
            this.skillIntervalTime = 99
        } else {
            let len = this.aim.parent.convertToWorldSpaceAR(this.aim.position).sub(this.node.parent.convertToWorldSpaceAR(this.node.position)).len()
            if (len <= this.attackLength) {
                this.attackAim(dt)
            } else {
                this.moveToAim(dt)
            }
        }
    }

    update (dt) {
        this.checkAttackType(dt)
    } 

    // 使用技能
    useSkill(dt) {
        this.isCanAttack = false
        this.useSkill_Q()
        return
        
        if (Math.random() > 0.2) {
            this.useSkill_E()
        } else {
            this.useSkill_Q()
        }
    }

    useSkill_E() {

    }

    useSkill_E_End() {

    }

    useSkill_Q() {

    }

    useSkill_Q_End() {

    } 
}
