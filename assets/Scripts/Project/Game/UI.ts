import { GameEventEnum } from "../Data/EventEnum";
import { GameEvent } from "../Main/EventDispatcher";
import Enemy from "./Enemy/Enemy";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UI extends cc.Component {
    public bossName: cc.Node = null
    public life: cc.Node = null

    private curretShowNode: cc.Node = null

    onLoad () {
        this.bossName = this.node.getChildByName('bossName')
        this.life = this.node.getChildByName('life')

        GameEvent.on(GameEventEnum.SHOW_ENEMY_DATA, this.onShowBossData, this)
        GameEvent.on(GameEventEnum.BULLET_COLLIDER_ENEMY, this.onRefreshData, this)
	}

    start () {

    }

    onShowBossData(enemy: cc.Node) {
        if (this.curretShowNode) {
            this.onRefreshData()
            return
        }

        this.curretShowNode = enemy
        this.bossName.active = true
        this.bossName.getComponent(cc.Label).string = enemy.getComponent(Enemy).enemyName
        this.life.active = true
        this.life.getComponent(cc.ProgressBar).progress = enemy.getComponent(Enemy).currentLife / enemy.getComponent(Enemy).life

        this.node.children.forEach(node => {
            node.opacity = 0
            cc.tween(node).to(0.12, {opacity: 255}).start()
        })
    }

    onRefreshData() {
        let enemy = this.curretShowNode
        this.life.getComponent(cc.ProgressBar).progress = enemy.getComponent(Enemy).currentLife / enemy.getComponent(Enemy).life
    }
    // update (dt) {}
}
