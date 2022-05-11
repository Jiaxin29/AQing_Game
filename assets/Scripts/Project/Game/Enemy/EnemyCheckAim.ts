import { GameEventEnum, GroupEnum } from "../../Data/EventEnum";
import { GameEvent } from "../../Main/EventDispatcher";
import InstallUI from "../../UI/InstallUI";
import HeroController from "../Hero/HeroController";
import Enemy from "./Enemy";

const {ccclass, property, executeInEditMode, requireComponent} = cc._decorator;

@ccclass
@requireComponent(cc.PhysicsCircleCollider)
export default class EnemyCheckAim extends cc.Component {
    onLoad () {
        
	}

    start () {

    }

    // 检查器
    onBeginContact(contact, selfCollider, otherCollider) {
        if (otherCollider.node.group != GroupEnum.Hero) {
            return
        }

        // 检测玩家附近
        if (selfCollider == this.node.getComponent(Enemy).checkAttackCollider && otherCollider == otherCollider.getComponent(HeroController).characterCollider) {
            this.node.getComponent(Enemy).aim = otherCollider.node
            GameEvent.emit(GameEventEnum.SHOW_ENEMY_DATA, this.node)
        }
    }

    // update (dt) {}
}
