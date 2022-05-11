import { GameEventEnum } from "../Data/EventEnum";
import { GameEvent } from "../Main/EventDispatcher";
import Enemy from "./Enemy/Enemy";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UI extends cc.Component {
    // 敌人
    public bossName: cc.Node = null
    public bossLife: cc.Node = null
    
    private curretShowNode: cc.Node = null

    onLoad () {
        this.bossName = this.node.getChildByName('boss').getChildByName('bossName')
        this.bossLife = this.node.getChildByName('boss').getChildByName('bossLife')

        GameEvent.on(GameEventEnum.SHOW_ENEMY_DATA, this.onShowBossData, this)
        GameEvent.on(GameEventEnum.BULLET_COLLIDER_ENEMY, this.onRefreshEnemyData, this)
	}

    start () {

    }

    // 玩家相关

    // 敌人相关
    onShowBossData(enemy: cc.Node) {
        if (this.curretShowNode) {
            this.onRefreshEnemyData()
            return
        }

        this.curretShowNode = enemy
        this.bossName.active = true
        this.bossName.getComponent(cc.Label).string = enemy.getComponent(Enemy).enemyName
        this.bossLife.active = true
        this.bossLife.getComponent(cc.ProgressBar).progress = enemy.getComponent(Enemy).currentLife / enemy.getComponent(Enemy).life

        this.node.children.forEach(node => {
            node.opacity = 0
            cc.tween(node).to(0.12, {opacity: 255}).start()
        })
    }

    onRefreshEnemyData() {
        if (!this.curretShowNode) {
            return
        }

        this.bossLife.getComponent(cc.ProgressBar).progress = this.curretShowNode.getComponent(Enemy).currentLife / this.curretShowNode.getComponent(Enemy).life
    }
    // update (dt) {}
}
