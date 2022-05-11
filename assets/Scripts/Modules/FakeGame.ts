import FChannelControl from "../_FutureCore/ChannelControl/FChannelControl";
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    
    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this)
    }

    start () {

    }

    onTouchStart(e: cc.Node.EventType) {
        FChannelControl.Me.onGameEnd()
        FChannelControl.Me.onInstall()
    }
    // update (dt) {}
}
