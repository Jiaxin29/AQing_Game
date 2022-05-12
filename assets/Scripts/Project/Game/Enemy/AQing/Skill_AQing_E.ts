import EnemyBaseNode from "../../Enemy/EnemyBaseNode";
import { Skill_Base } from "../../Skill/Skill_Base";


const {ccclass, property} = cc._decorator;

@ccclass
export default class Skill_AQing_E extends Skill_Base {
    public collider: cc.PhysicsCollider = null

    @property(cc.Prefab)
    public effect: cc.Prefab = null

    onLoad () {
        this.collider = this.node.getComponent(cc.PhysicsCollider)
	}

    start () {
        this.collider.enabled = false
    }

    // 显示技能
    showSkill(enemy: cc.Node, aimNode: cc.Node) {
        let enemyWorldPos = enemy.parent.convertToWorldSpaceAR(enemy.position)
        let aim = aimNode.parent.convertToWorldSpaceAR(aimNode.position).sub(enemyWorldPos)
        aim.normalizeSelf()
        aim.mulSelf(500)
        aim.addSelf(enemyWorldPos)

        aim = this.node.parent.convertToNodeSpaceAR(aim)
        cc.tween(this.node).to(0.3, {position: aim}).start()
        cc.tween(enemy).delay(1).to(0.02, {position: aim}).call(()=>{
            this.collider.enabled = true
        }).delay(0.1).call(()=>{
            this.showEffect()
            enemy.getComponent(EnemyBaseNode).useSkill_E_End()
        }).start()

        this.removeDelayTime(1 + 0.02 + 0.1, this.node)
    }

    showEffect() {
        let effect = cc.instantiate(this.effect)
        effect.parent = this.node.parent
        effect.position = this.node.position

        cc.tween(effect).delay(1).call(()=>{
            effect.destroy()
        }).start()
    }
    // update (dt) {}
}
