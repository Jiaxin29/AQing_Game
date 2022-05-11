import { GameEventEnum } from "../Project/Data/EventEnum";
import { GameEvent } from "../Project/Main/EventDispatcher";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    public isCanTouch: boolean = true

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this)    
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this)    
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this)    
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this)
        GameEvent.on(GameEventEnum.SET_CAN_TOUCH, this.onSetCanTouch, this)
    }

    start () {

    }

    // 其他地方广播消息
    onSetCanTouch(bool: boolean = false) {
        this.isCanTouch = bool
    }

    // 点击开始
    onTouchStart(event: cc.Event.EventTouch) {
        if (!this.isCanTouch) {
            return
        }
    }

    // 点击移动
    onTouchMove(event: cc.Event.EventTouch) {
        if (!this.isCanTouch) {
            return
        }
    }

    // 点击结束
    onTouchEnd(event: cc.Event.EventTouch) {
        if (!this.isCanTouch) {
            return
        }
    }

    // 取消点击，移出设定的区域外
    onTouchCancel(event: cc.Event.EventTouch) {
        if (!this.isCanTouch) {
            return
        }
    }

    // update (dt) {}
}
