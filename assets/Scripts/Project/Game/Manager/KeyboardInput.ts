import { GameEventEnum } from "../../Data/EventEnum";
import { GameEvent } from "../../Main/EventDispatcher";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this)
	}

    start () {

    }

    onKeyDown(event: cc.Event.EventKeyboard) {
        GameEvent.emit(GameEventEnum.KEY_BOARD_KEY_DOWN, event.keyCode)
    }

    onKeyUp(event: cc.Event.EventKeyboard) {
        GameEvent.emit(GameEventEnum.KEY_BOARD_KEY_UP, event.keyCode)
    }
    // update (dt) {}
}
