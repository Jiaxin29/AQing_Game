import { VectorsToDegrees } from "../../../Modules/GlobalFunction";
import { GameEventEnum, GroupEnum } from "../../Data/EventEnum";
import { GameEvent } from "../../Main/EventDispatcher";
import Character from "../Basics/Character";
import EnemyBaseNode from "../Enemy/EnemyBaseNode";
import HeroInput from "./HeroInput";

const {ccclass, property} = cc._decorator;

@ccclass
export default class HeroController extends Character {
    public body: cc.Node = null
    public hand: cc.Node = null
    public heroInput: HeroInput = null
    public aim: cc.Node = null  // 攻击目标
    public lifeProgress: cc.ProgressBar = null
    public pm: cc.Node = null

    onLoad () {
        super.onLoad()
        this.body = this.node.getChildByName('body')
        this.heroInput = this.node.getComponent(HeroInput)
        this.hand = this.body.getChildByName('hand')
        this.lifeProgress = this.node.getChildByName('life').getComponent(cc.ProgressBar)
        this.pm = this.body.getChildByName('pm')

        this.life = 20
        this.maxMoveSpeed = 700
        this.moveSpeed = this.maxMoveSpeed
	}

    start () {
        super.start()
        this.lifeProgress.progress = this.currentLife / this.life

        cc.tween(this.pm).repeatForever(
            cc.tween().by(2, {y: 20}).by(2, {y: -20})
        ).start()
    }

    // 检测攻击
    checkAttack() {
        if (!this.isCanAttack) {
            return
        }

        this.isCanAttack = false

        let dir = this.velocity.x > 0 ? cc.v3(1, 0) : cc.v3(-1, 0)
        if (this.aim) {
            let aimWPos = this.aim.parent.convertToWorldSpaceAR(this.aim.position)
            dir = aimWPos.sub(this.node.parent.convertToWorldSpaceAR(this.node.position)).normalize()
        }

        GameEvent.emit(GameEventEnum.ATTACK_TO_ENEMY, this.node.parent.convertToWorldSpaceAR(this.node.position), dir)
        this.velocity = cc.v2(0, 0)
        cc.tween(this.hand).by(0.1, {angle: 30}).by(0.1, {angle: -30}).call(()=>{
            this.isCanAttack = true
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
            this.body.scaleX = this.velocity.x >= 0 ? 1 : -1
        }
    }

    // 掉血
    hurt() {
        this.currentLife--
        this.lifeProgress.progress = this.currentLife / this.life
    }

    update (dt) {
        this.checkMove(dt)
    }

    onBeginContact(contact, selfCollider, otherCollider) {
        if (otherCollider.node.group == GroupEnum.Enemy) {
            this.contactEnemy(true, contact, selfCollider, otherCollider)
        } else if (otherCollider.node.group == GroupEnum.Enemy_Bullet) {
            this.contactEnemyBullet(true, contact, selfCollider, otherCollider)
        }
    }

    onEndContact(contact, selfCollider, otherCollider) {
        if (otherCollider.node.group == GroupEnum.Enemy) {
            this.contactEnemy(true, contact, selfCollider, otherCollider)
        }
    }

    // 检测到了敌人
    contactEnemy(isBegin: boolean, contact, selfCollider, otherCollider) {
        if (selfCollider == this.checkAttackCollider && otherCollider == otherCollider.getComponent(EnemyBaseNode).characterCollider) {
            this.aim = isBegin ? otherCollider.node : null
        }
    }

    // 检测到了敌人子弹
    contactEnemyBullet(isBegin: boolean, contact, selfCollider, otherCollider) {
        if (selfCollider == this.characterCollider) {
            this.hurt()
        }
    }
}
