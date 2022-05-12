import { VectorsToDegrees } from "../../../Modules/GlobalFunction";
import { GameEventEnum, GroupEnum } from "../../Data/EventEnum";
import { GameEvent } from "../../Main/EventDispatcher";
import EnemyBaseNode from "../Enemy/EnemyBaseNode";
import HeroInput from "./HeroInput";

const {ccclass, property} = cc._decorator;

@ccclass
export default class HeroController extends cc.Component {
    public velocity: cc.Vec2 = cc.v2(0, 0)
    public moveSpeed: number = 700
    public hand: cc.Node = null
    public rigidbody: cc.RigidBody = null
    public isAttacking: boolean = false
    public heroInput: HeroInput = null
    public aim: cc.Node = null  // 攻击目标
    public lifeProgress: cc.ProgressBar = null

    // 碰撞体
    public checkAttackCollider: cc.PhysicsCircleCollider = null  // 检测攻击碰撞体
    public characterCollider: cc.PhysicsBoxCollider = null  // 人物碰撞体

    public currentLife: number = 10
    public totalLife: number = 10

    onLoad () {
        this.heroInput = this.node.getComponent(HeroInput)
        this.hand = this.node.getChildByName('hand')
        this.rigidbody = this.node.getComponent(cc.RigidBody)
        this.lifeProgress = this.node.getChildByName('life').getComponent(cc.ProgressBar)

        this.checkAttackCollider = this.node.getComponent(cc.PhysicsCircleCollider)
        this.characterCollider = this.node.getComponent(cc.PhysicsBoxCollider)
	}

    start () {

    }

    // 检测攻击
    checkAttack() {
        if (this.isAttacking) {
            return
        }

        this.isAttacking = true

        let dir = this.velocity.x > 0 ? cc.v3(1, 0) : cc.v3(-1, 0)
        if (this.aim) {
            let aimWPos = this.aim.parent.convertToWorldSpaceAR(this.aim.position)
            dir = aimWPos.sub(this.node.parent.convertToWorldSpaceAR(this.node.position)).normalize()
        }

        GameEvent.emit(GameEventEnum.ATTACK_TO_ENEMY, this.node.parent.convertToWorldSpaceAR(this.node.position), dir)
        this.velocity = cc.v2(0, 0)
        cc.tween(this.hand).by(0.1, {angle: 30}).by(0.1, {angle: -30}).call(()=>{
            this.isAttacking = false
        }).start()
    }

    // 检测移动
    checkMove(dt) {
        if (!this.velocity) {
            return
        }

        this.velocity.x = (this.heroInput.isInputKeyD ? 1: 0) - (this.heroInput.isInputKeyA ? 1 : 0)
        this.velocity.y = (this.heroInput.isInputKeyW ? 1: 0) - (this.heroInput.isInputKeyS ? 1 : 0)
        this.velocity.normalizeSelf()

        this.rigidbody.linearVelocity = this.rigidbody.linearVelocity.lerp(this.velocity.mul(this.moveSpeed), 0.4)
        if (this.velocity.len() != 0) {
            // this.node.angle = VectorsToDegrees(this.rigidbody.linearVelocity.normalize())
            this.node.scaleX = this.velocity.x >= 0 ? 1 : -1
        }
    }

    // 掉血
    hurt() {
        console.log('[HeroController] hurt..')
        this.currentLife--
        this.lifeProgress.progress = this.currentLife / this.totalLife
    }

    update (dt) {
        this.checkMove(dt)
    }

    onBeginContact(contact, selfCollider, otherCollider) {
        if (otherCollider.node.group != GroupEnum.Enemy) {
            return
        }

        if (selfCollider == this.checkAttackCollider && otherCollider == otherCollider.getComponent(EnemyBaseNode).characterCollider) {
            this.aim = otherCollider.node
        }
    }

    onEndContact(contact, selfCollider, otherCollider) {
        if (otherCollider.node.group != GroupEnum.Enemy) {
            return
        }

        if (selfCollider == this.checkAttackCollider && otherCollider == otherCollider.getComponent(EnemyBaseNode).characterCollider) {
            this.aim = null
        }
    }
}
