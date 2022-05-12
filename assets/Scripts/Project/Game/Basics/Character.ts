// 角色类
const {ccclass, property} = cc._decorator;

@ccclass
export default class Character extends cc.Component {
    public moveSpeed: number = 100  // 移动速度
    public velocity: cc.Vec2 = cc.v2(0, 0)  // 移动方向(速度)
    public currentLife: number = 20  // 当前生命
    public isCanAttack: boolean = true  // 是否可以攻击(1.没在使用技能 2.进入攻击范围内)
    
    // 刚体和碰撞体
    public rigidbody: cc.RigidBody = null  // 刚体
    public checkAttackCollider: cc.PhysicsCircleCollider = null  // 检测攻击碰撞体
    public characterCollider: cc.PhysicsBoxCollider = null  // 人物碰撞体

    // 需要设置的内容
    public life: number = 20  // 总生命
    public characterName: string = 'CharacterName'

    onLoad () {
        this.checkAttackCollider = this.node.getComponent(cc.PhysicsCircleCollider)
        this.characterCollider = this.node.getComponent(cc.PhysicsBoxCollider)
        this.rigidbody = this.node.getComponent(cc.RigidBody)
	}

    start () {
        this.currentLife = this.life
    }

    // update (dt) {}
}
