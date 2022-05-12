import { GameEventEnum } from "../Data/EventEnum";
import { GameEvent } from "../Main/EventDispatcher";
import Character from "./Basics/Character";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UI extends cc.Component {
    // 敌人
    public bossData: cc.Node = null
    public bossName: cc.Node = null
    public bossLife: cc.Node = null
    
    private curretShowNode: cc.Node = null

    onLoad () {
        this.bossData = this.node.getChildByName('bossData')
        this.bossName = this.bossData.getChildByName('bossName')
        this.bossLife = this.bossData.getChildByName('bossLife')

        GameEvent.on(GameEventEnum.SHOW_ENEMY_DATA, this.onShowBossData, this)
        GameEvent.on(GameEventEnum.ATTACK_TO_ENEMY_SUCCESS, this.onRefreshEnemyData, this)
        GameEvent.on(GameEventEnum.REFRESH_ENEMY, this.onRefreshEnemy, this)
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
        this.bossName.getComponent(cc.Label).string = enemy.getComponent(Character).characterName
        this.bossLife.active = true
        this.bossLife.getComponent(cc.ProgressBar).progress = enemy.getComponent(Character).currentLife / enemy.getComponent(Character).life

        this.bossData.children.forEach(node => {
            node.opacity = 0
            cc.tween(node).to(0.12, {opacity: 255}).start()
        })
    }

    onRefreshEnemyData() {
        if (!this.curretShowNode) {
            return
        }

        this.bossLife.getComponent(cc.ProgressBar).progress = this.curretShowNode.getComponent(Character).currentLife / this.curretShowNode.getComponent(Character).life
    }

    onRefreshEnemy(enemy: cc.Node) {
        this.curretShowNode = enemy
        this.bossName.getComponent(cc.Label).string = enemy.getComponent(Character).characterName
        this.bossLife.getComponent(cc.ProgressBar).progress = enemy.getComponent(Character).currentLife / enemy.getComponent(Character).life
    }
    // update (dt) {}
}
