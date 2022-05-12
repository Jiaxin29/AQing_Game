import HeroController from "../Hero/HeroController";

const {ccclass, property} = cc._decorator;

@ccclass
export abstract class Skill_Base extends cc.Component {
    public collider: cc.PhysicsCollider = null

    onLoad () {
	
	}

    start () {

    }

    // 技能展示，必须重写
    abstract showSkill(enemy: cc.Node, aimNode: cc.Node, endFun?: Function)

    // 碰撞，移除本地碰撞器
    onBeginContact(contact, selfCollider, otherCollider) {
        let hero = otherCollider.getComponent(HeroController)
        if (otherCollider == hero.characterCollider) {
            this.collider.enabled = false
        }
    }

    // update (dt) {}
}
