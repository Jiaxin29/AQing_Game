import { FMgr } from "../../_FutureCore/Manager/FMgr";

const {ccclass, property} = cc._decorator;

let SoundRes = {
    Play: 'adcolony_soundUI/btn_sound',
    NotPlay: 'adcolony_soundUI/btn_sound2'
}

@ccclass
export default class NewClass extends cc.Component {
    private isPlay: boolean = true

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this)
    }

    onTouchEnd (event: cc.Event.EventTouch) {
        this.isPlay = !this.isPlay
        let path = SoundRes.Play
        if (this.isPlay) {
            FMgr.Audio.OpenAllSound()
            path = SoundRes.Play
        } else {
            FMgr.Audio.PauseMusic()
            FMgr.Audio.CloseAllSound()
            path = SoundRes.NotPlay
        }
        cc.loader.loadRes(path, cc.SpriteFrame, (err, spriteFrame)=>{
            this.node.getComponent(cc.Sprite).spriteFrame = spriteFrame
        });
    }

    // update (dt) {}
}
