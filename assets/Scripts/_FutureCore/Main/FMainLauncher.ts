/*
    aoemo.com
*/

import "./FJSWindow";
import { FMgr } from "../Manager/FMgr";
import FChannelControl from "../ChannelControl/FChannelControl";

// 从 cc._decorator 命名空间中引入 ccclass 装饰器
const { ccclass } = cc._decorator;

// 使用装饰器声明 CCClass
@ccclass
// ES6 Class 声明语法，继承 cc.Component
export default class FMainLauncher extends cc.Component {
    public static Me: FMainLauncher = null;

    private managerRoot: cc.Node = null;

    // 成员方法
    onLoad() {
        cc.log("[FMainLauncher]onLoad");
        FMainLauncher.Me = this;

        this.managerRoot = new cc.Node();
        this.managerRoot.name = "FMgr";
        this.managerRoot.setParent(this.node);
        FMgr.Init(this.managerRoot);
    }

    start() {
        cc.log("[FMainLauncher]start");
        this.checkPlatformToPlayBgm()
    }

    update() {
    }

    checkPlatformToPlayBgm() {
        let _playBgmCallback = ()=>{
            setTimeout(() =>
            {
                FMgr.Audio.isCanPlaySound = true
                FMgr.Audio.PlayBgm('bgm_MainScene', 0.7);
            }, 0.1);
        }

        if(FChannelControl.Me.autoPlayBgm()){
            _playBgmCallback()
            return
        }

        // AppLovin渠道特殊处理
        const playBgmCallback = ()=>{
            document.removeEventListener('mousedown', playBgmCallback , true)
            document.removeEventListener('touchstart', playBgmCallback , true)
            _playBgmCallback()
        }

        document.addEventListener('mousedown', playBgmCallback , true)
        document.addEventListener('touchstart', playBgmCallback , true)
    }
}