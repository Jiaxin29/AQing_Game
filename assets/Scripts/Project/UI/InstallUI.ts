/*
    aoemo.com
*/

import FChannelControl from "../../_FutureCore/ChannelControl/FChannelControl";
import { FMgr } from "../../_FutureCore/Manager/FMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class InstallUI extends cc.Component {
    @property
    public isRotateBtn: boolean = false

    @property
    public isScaleBtn: boolean = false

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this)    
    }

    start() {
        this.rotateBtn()
        this.scaleBtn()
    }

    onTouchEnd(event: cc.Event.EventTouch) {
        FMgr.Audio.PlayEffect('frame_install')
        FChannelControl.Me.onInstall()
    }

    gameEnd() {
        let endPos = cc.v2(0, -250);
        this.node.runAction(
            cc.spawn(
                cc.moveTo(0.3, endPos),
                cc.scaleTo(0.3, 1.2),
            )
        );
    }

    private rotateBtn() {
        if (!this.isRotateBtn) {
            return
        }

        let time = 0.2
        let angle = 3 
        cc.tween(this.node).repeatForever(cc.tween().by(time, {angle:angle}).by(0.4, {angle:-2 * angle}).by(time, {angle:angle})).start()
    }

    private scaleBtn() {
        if (!this.isScaleBtn) {
            return
        }

        let time = 0.3
        let scale = 0.1
        cc.tween(this.node).repeatForever(cc.tween().by(time, {scale:scale}).by(time, {scale:-scale})).start()
    }
}