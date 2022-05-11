import { GameEventEnum } from "../Data/EventEnum";
import { GameEvent } from "../Main/EventDispatcher";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    onLoad () {
        GameEvent.on(GameEventEnum.SET_GUIDE_ACTIVE, this.onSetGuideActive, this)
    }

    start () {

    }

    onSetGuideActive(_isShow: boolean = false) {
        this.node.active = _isShow
    }
    // update (dt) {}
}
