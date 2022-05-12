import { DegreesToVectors, GetWorldDir, VectorsToDegrees } from "../../Modules/GlobalFunction";
import { GameEventEnum } from "../Data/EventEnum";
import { GameEvent } from "../Main/EventDispatcher";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Prefab)
    public bullet: cc.Prefab = null

    onLoad () {
        GameEvent.on(GameEventEnum.ATTACK_TO_ENEMY, this.onAttckToEnemy, this)
        GameEvent.on(GameEventEnum.ATTACK_TO_HERO, this.onAttackToHero, this)
	}

    start () {

    }

    // 攻击敌人
    onAttckToEnemy(wPos: cc.Vec3, dir: cc.Vec3) {
        let bullet = cc.instantiate(this.bullet)
        bullet.parent = this.node
        bullet.position = bullet.parent.convertToNodeSpaceAR(wPos)
        let rb2d = bullet.getComponent(cc.RigidBody)
        dir.normalizeSelf()
        let d = dir.mul(1600)
        
        rb2d.linearVelocity = cc.v2(d)
        cc.tween(bullet).delay(1).call(()=>{
            bullet.destroy()
        }).start()
    }

    // 敌人攻击玩家
    onAttackToHero(enemy: cc.Node, aimNode: cc.Node, bullet: cc.Prefab) {
        let wPos = enemy.parent.convertToWorldSpaceAR(enemy.position)
        let dir = GetWorldDir(enemy, aimNode)
        dir.mulSelf(400)

        let item = cc.instantiate(bullet)
        item.parent = this.node
        item.position = item.parent.convertToNodeSpaceAR(wPos)
        item.angle = VectorsToDegrees(cc.v2(dir))
        cc.tween(item).by(0.3, {position: dir}).call(()=>{
            item.destroy()
        }).start()
        
    }
    // update (dt) {}
}
