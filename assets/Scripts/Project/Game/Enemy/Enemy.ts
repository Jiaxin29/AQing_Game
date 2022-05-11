import { R } from "../../../../gen/R";
import { DegreesToVectors, VectorsToDegrees } from "../../../Modules/GlobalFunction";
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

    // 使用技能间隔时间
    public skillIntervalTime: number = 3

    // 属性，用于显示
    @property
    public life: number = 20  // 总生命

    @property
    public enemyName: string = 'Amber'
    
    @property(cc.Prefab)
    public xiezi: cc.Prefab = null  // 楔子

    @property(cc.Prefab)
    public xingti: cc.Prefab = null  // 形体

    onLoad () {
        this.hand = this.node.getChildByName('hand')
        this.rigidbody = this.node.getComponent(cc.RigidBody)
        this.checkAttackCollider = this.node.getComponent(cc.PhysicsCircleCollider)
        this.characterCollider = this.node.getComponent(cc.PhysicsBoxCollider)
	}

    start () {
        this.currentLife = this.life
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

    // 使用技能
    useSkill(dt) {
        if (Math.random() > 0.6) {
            this.useSkill1()
        } else {
            this.useSkill2()
        }
    }

    // 技能1
    useSkill1() {
        console.log('useSkill1')
        let aim = this.aim.parent.convertToWorldSpaceAR(this.aim.position).sub(this.node.parent.convertToWorldSpaceAR(this.node.position))
        aim.normalizeSelf()
        
        aim.mulSelf(500)
        aim.addSelf(this.node.position)
        let xiezi = cc.instantiate(this.xiezi)
        xiezi.parent = this.node.parent 
        xiezi.position = this.node.position
        
        cc.tween(xiezi).to(0.3, {position: aim}).start()

        this.moveSpeed = 10
        cc.tween(this.node).delay(1).to(0.02, {position: aim}).call(()=>{
            xiezi.destroy()
            this.moveSpeed = 100
        }).start()
    }

    // 技能2
    useSkill2() {
        console.log('useSkill2')
        let temp = []
        
        for (let i = 0; i < 6; i++) {
            let dir = DegreesToVectors(i / 6 * 360)
            dir.mulSelf(400)

            let aimPos = this.node.position.add(cc.v3(dir))
            let xingti = cc.instantiate(this.xingti)

            xingti.position = this.node.position
            xingti.parent = this.node.parent
            xingti.scaleX = this.node.scaleX
            temp.push(xingti)
            cc.tween(xingti).to(0.12, {position: aimPos}).start()
        }

        this.moveSpeed = 0
        this.scheduleOnce(()=>{
            for (let n of temp) {
                n.destroy()
            }
            this.moveSpeed = 100
        }, 1)
    }

    checkAttackType(dt) {
        if (!this.aim) {
            return
        }

        this.skillIntervalTime -= dt
        if (this.skillIntervalTime <= 0) {
            this.useSkill(dt)
            this.skillIntervalTime = 3
        } else {
            this.moveToAim(dt)
        }
    }

    update (dt) {
        this.checkAttackType(dt)
    }  
}
