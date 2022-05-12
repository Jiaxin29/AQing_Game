import { GameEventEnum } from "../../Data/EventEnum";
import { GameEvent } from "../../Main/EventDispatcher";
import EnemyBaseNode from "../Enemy/EnemyBaseNode";
import HeroController from "../Hero/HeroController";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameController extends cc.Component {
    public currentIdx: number = null
    public currentShowTime: number = 5
    public totalShowTime: number = 5
    public currentEnemy: cc.Node = null

    @property([cc.Prefab])
    public enemys: cc.Prefab[] = []
    
    @property(cc.Node)
    public hero: cc.Node = null

    onLoad () {
	
	}

    start () {
        this.createEnemy()
    }

    public createEnemy() {
        let temp = []
        for (let i = 0; i < this.enemys.length; i++) {
            if (this.currentIdx !== null && i == this.currentIdx) {
                continue
            }

            temp.push(i)
        }

        let idx = temp[Math.floor(Math.random() * temp.length)]
        this.currentIdx = idx
        let prefab = this.enemys[idx]

        let enemy = cc.instantiate(prefab)
        enemy.parent = this.node
        enemy.position = this.currentEnemy ? this.currentEnemy.position : cc.v3(0, 544, 0)

        if (this.currentEnemy) {
            enemy.getComponent(EnemyBaseNode).aim = this.currentEnemy.getComponent(EnemyBaseNode).aim
            this.hero.getComponent(HeroController).aim = enemy

            GameEvent.emit(GameEventEnum.REFRESH_ENEMY, enemy)
            this.currentEnemy.destroy()
            this.currentEnemy = null
        }
        this.currentEnemy = enemy

        console.log('createEnemy')
    }

    update (dt) {
        this.currentShowTime -= dt
        if (this.currentShowTime <= 0) {
            this.totalShowTime = Math.random() * 2 + 5
            this.currentShowTime = this.totalShowTime
            this.createEnemy()
        }
    }
}
