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
    public aim: cc.Node = null  // 攻击目标
    public currentLife: number = 20  // 当前生命

    // 碰撞体
    public checkAttackCollider: cc.PhysicsCircleCollider = null  // 检测攻击碰撞体
    public characterCollider: cc.PhysicsBoxCollider = null  // 人物碰撞体

    // 属性，用于显示
    @property
    public life: number = 20  // 总生命

    @property
    public enemyName: string = 'Amber'
    

    onLoad () {
        this.hand = this.node.getChildByName('hand')
        this.rigidbody = this.node.getComponent(cc.RigidBody)
        this.checkAttackCollider = this.node.getComponent(cc.PhysicsCircleCollider)
        this.characterCollider = this.node.getComponent(cc.PhysicsBoxCollider)
	}

    start () {
        this.currentLife = this.life
        GameEvent.emit(GameEventEnum.SHOW_ENEMY_DATA, this.node)
    }
    
    onBeginContact(contact, selfCollider, otherCollider) {
        // 被玩家打到
        if (selfCollider instanceof cc.PhysicsBoxCollider && otherCollider.node.group == GroupEnum.Hero_Bullet) {
            this.currentLife--
            GameEvent.emit(GameEventEnum.BULLET_COLLIDER_ENEMY, this.node)
            otherCollider.node.destroy()
            contact.disabled = true
            return
        }
    }

    // onEndContact(contact, selfCollider, otherCollider) {
        
    // }

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
        // this.node.angle = VectorsToDegrees(this.velocity)
        this.node.scaleX = this.velocity.x >= 0 ? 1 : -1
    }

    update (dt) {
        this.moveToAim(dt)
    }  
}
