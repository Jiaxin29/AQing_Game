import { VectorsToDegrees } from "../../../Modules/GlobalFunction";
import { GameEventEnum } from "../../Data/EventEnum";
import { GameEvent } from "../../Main/EventDispatcher";
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

    onLoad () {
        this.heroInput = this.node.getComponent(HeroInput)
        this.hand = this.node.getChildByName('hand')
        this.rigidbody = this.node.getComponent(cc.RigidBody)
	}

    start () {

    }

    // 检测攻击
    checkAttack() {
        if (this.isAttacking) {
            return
        }

        this.isAttacking = true
        GameEvent.emit(GameEventEnum.ATTACK, this.node.parent.convertToWorldSpaceAR(this.node.position), this.node.angle)
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
        this.rigidbody.linearVelocity = this.velocity.mul(this.moveSpeed)

        if (this.velocity.len() != 0) {
            this.node.angle = VectorsToDegrees(this.velocity)
        }
    }

    update (dt) {
        this.checkMove(dt)
    }
}
