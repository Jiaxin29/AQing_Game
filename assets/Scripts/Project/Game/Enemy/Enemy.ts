import { VectorsToDegrees } from "../../../Modules/GlobalFunction";
import { GameEventEnum, GroupEnum } from "../../Data/EventEnum";
import { GameEvent } from "../../Main/EventDispatcher";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Enemy extends cc.Component {
    public velocity: cc.Vec2 = cc.v2(0, 0)
    public rigidbody: cc.RigidBody = null
    public moveSpeed: number = 100
    public hand: cc.Node = null
    public enemyCollider: cc.PhysicsBoxCollider = null
    public checkCollider: cc.PhysicsCircleCollider = null
    public aim: cc.Node = null  // 目标

    // 属性，用于显示
    public life: number = 20  // 总生命
    public enemyName: string = 'Amber'
    public currentLife: number = 20  // 当前生命

    onLoad () {
        this.hand = this.node.getChildByName('hand')
        this.rigidbody = this.node.getComponent(cc.RigidBody)
        this.checkCollider = this.node.getComponent(cc.PhysicsCircleCollider)
        this.enemyCollider = this.node.getComponent(cc.PhysicsBoxCollider)
	}

    start () {
        this.currentLife = this.life
    }

    onBeginContact(contact, selfCollider, otherCollider) {
        if (selfCollider == this.checkCollider && otherCollider.node.group == GroupEnum.Hero) {
            this.aim = otherCollider.node
            GameEvent.emit(GameEventEnum.SHOW_ENEMY_DATA, this.node)
            return
        }
        
        if (selfCollider == this.enemyCollider &&  otherCollider.node.group == GroupEnum.Hero_Bullet) {
            this.currentLife--
            GameEvent.emit(GameEventEnum.BULLET_COLLIDER_ENEMY, this.node)
            otherCollider.node.destroy()
            return
        }
    }

    onEndContact(contact, selfCollider, otherCollider) {
        
    }

    moveToAim(dt) {
        if (!this.aim) {
            return
        }

        let wPos = this.aim.parent.convertToWorldSpaceAR(this.aim.position)
        let meWPos = this.node.parent.convertToWorldSpaceAR(this.node.position)
        let dir = wPos.sub(meWPos)
        dir = dir.normalizeSelf()
        this.velocity.x = dir.x
        this.velocity.y = dir.y

        this.rigidbody.linearVelocity = this.velocity.mul(this.moveSpeed)
        this.node.angle = VectorsToDegrees(this.velocity)
    }

    update (dt) {
        this.moveToAim(dt)
    }  
}
