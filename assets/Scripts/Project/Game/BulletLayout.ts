import { DegreesToVectors, VectorsToDegrees } from "../../Modules/GlobalFunction";
import { GameEventEnum } from "../Data/EventEnum";
import { GameEvent } from "../Main/EventDispatcher";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Prefab)
    public bullet: cc.Prefab = null

    onLoad () {
        GameEvent.on(GameEventEnum.ATTACK_TO_ENEMY, this.onAttack, this)
	}

    start () {

    }

    onAttack(wPos: cc.Vec3, dir: cc.Vec3) {
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
    // update (dt) {}
}
