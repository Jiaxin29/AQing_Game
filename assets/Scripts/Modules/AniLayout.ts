import { GameEventEnum } from "../Project/Data/EventEnum";
import { GameEvent } from "../Project/Main/EventDispatcher";
import { FMgr } from "../_FutureCore/Manager/FMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Prefab)
    public refreshEnemy: cc.Prefab = null

    onLoad () {
        GameEvent.on(GameEventEnum.REFRESH_ENEMY, this.onShowRefreshEnemy, this)
    }

    start () {
        
    }

    onShowRefreshEnemy(enemy: cc.Node) {
        let wPos = enemy.parent.convertToWorldSpaceAR(enemy.position)
        let ani = cc.instantiate(this.refreshEnemy)
        ani.parent = this.node
        ani.position = ani.parent.convertToNodeSpaceAR(wPos)
        cc.tween(ani).delay(2).call(()=>{
            ani.destroy()
        }).start()
    }
    // update (dt) {}
}
