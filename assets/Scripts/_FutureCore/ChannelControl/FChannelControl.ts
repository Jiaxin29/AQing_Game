/*
    aoemo.com
*/

export enum ChannelType{
    Unity3d = 1,
    AppLovin = 2,
    MTG = 3,
    Tapjoy = 4,
    Adcolony = 5,
    Ironsrc = 6,
    // Facebook = 7,
    TikTok = 8,
    Google = 9,
    Kwai = 10,
    Bigo = 11,
}

export enum PlatformType{
    Android = 1,
    iOS = 2,
}

// 各渠道文件
import BaseChannel from "../Channels/BaseChannel";
import AppLovinChannel from "../Channels/AppLovinChannel";
import MTGChannel from "../Channels/MTGChannel";
import TapjoyChannel from "../Channels/TapjoyChannel";
import IronsrcChannel from "../Channels/IronsrcChannel";
import AdcolonyChannel from "../Channels/AdcolonyChannel";
// import FacebookChannel from "../Channels/FacebookChannel";
import TikTokChannel from "../Channels/TikTokChannel";
import UnityChannel from "../Channels/UnityChannel";
import GoogleChannel from "../Channels/GoogleChannel";
import KwaiChannel from "../Channels/KwaiChannel";
import BigoChannel from "../Channels/BigoChannel";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FChannelControl extends cc.Component {
    public static Me: FChannelControl = null;

    @property({
        displayName: "D_构建Id",
        tooltip: "（可变项）D_构建Id",
    })
    buildId: string = "0";

    @property({
        type: cc.Enum(ChannelType),
        displayName: "D_广告渠道类型",
        tooltip: "（可变项）D_广告渠道类型",
    })
    channelType: ChannelType = ChannelType.Unity3d;

    @property({
        type: cc.Enum(PlatformType),
        displayName: "D_硬件平台",
        tooltip: "（可变项）D_硬件平台",
    })
    platform: PlatformType = PlatformType.Android;

    @property({
        displayName: "AndroidUrl",
        tooltip: "AndroidUrl",
    })
    androidAppUrl: string = "";

    @property({
        displayName: "iOSUrl",
        tooltip: "iOSUrl",
    })
    iOSAppUrl: string = "";

    @property({
        displayName: "是否支持重新开始",
        tooltip: "是否支持重新开始",
    })
    isGameRetry: boolean = false;

    @property({
        type: cc.Node,
        displayName: "审核UI",
        tooltip: "不同渠道有不同的显示审核条件，这里只放基类，由子类去判断",
    })
    public reviewUI: cc.Node = null

    private _channel: BaseChannel = null

    onLoad() {
        FChannelControl.Me = this;

        this.requireChannel()
        this.checkReviewUI()
        this.onGameReady();
    }

    // 导入渠道(若没有特殊改动默认使用base)
    private requireChannel() {
        switch(this.channelType) {
            case ChannelType.Unity3d:
                this._channel = this.node.addComponent(UnityChannel)
                break
            case ChannelType.AppLovin:
                this._channel = this.node.addComponent(AppLovinChannel)
                break
            case ChannelType.MTG:
                this._channel = this.node.addComponent(MTGChannel)
                break
            case ChannelType.Tapjoy:
                this._channel = this.node.addComponent(TapjoyChannel)
                break
            case ChannelType.Ironsrc:
                this._channel = this.node.addComponent(IronsrcChannel)
                break
            case ChannelType.Adcolony:
                this._channel = this.node.addComponent(AdcolonyChannel)
                break
            // case ChannelType.Facebook:
            //     this._channel = this.node.addComponent(FacebookChannel)
            //     break
            case ChannelType.TikTok:
                this._channel = this.node.addComponent(TikTokChannel)
                break
            case ChannelType.Google:
                this._channel = this.node.addComponent(GoogleChannel)
                break
            case ChannelType.Kwai:
                this._channel = this.node.addComponent(KwaiChannel)
                break
            case ChannelType.Bigo:
                this._channel = this.node.addComponent(BigoChannel)
                break
            default:
                this._channel = this.node.addComponent(BaseChannel)
                break
        }

        if (!this._channel) {
            return
        }

        this._channel.setBuildId(this.buildId)
        this._channel.setGameRetry(this.isGameRetry)
        this.resetChannelUrl()
    }

    // 检查审核UI
    private checkReviewUI() {
        if (!this._channel) {
            return
        }

        // 先隐藏所有
        if (!this.reviewUI) {
            console.log('没有reviewUI，请检查，或者可能不需要检查审核UI')
            return
        }

        for(let child of this.reviewUI.children) {
            child.active = false
        }
        
        this._channel.checkReviewUI(this.reviewUI)
    }

    onGameReady() {
        if (!this._channel) {
            return
        }

        this._channel.onGameReady()
    }

    onGameRetry() {
        if (!this._channel) {
            return
        }

        this._channel.onGameRetry()
    }

    onInstall() {
        if (!this._channel) {
            return
        }

        this._channel.onInstall()
    }

    onGameEnd() {
        if (!this._channel) {
            return
        }

        this._channel.onGameEnd()
    }

    public getIsUnity3dChannel(): boolean {
        return this.channelType == ChannelType.Unity3d
    }

    public getIsApplovinChannel(): boolean {
        return this.channelType == ChannelType.AppLovin
    }

    public getIsMTGChannel(): boolean {
        return this.channelType == ChannelType.MTG
    }

    public getIsAndroidPlatform(): boolean {
        return this.platform == PlatformType.Android
    }

    private getUrlByPlatform(): string {
        let url = null
        if (this.platform == PlatformType.Android) {
            url = this.androidAppUrl;
        }
        else if (this.platform == PlatformType.iOS) {
            url = this.iOSAppUrl;
        }

        return url
    }

    public resetChannelUrl() {
        this._channel.setUrl(this.getUrlByPlatform())
    }

    public autoPlayBgm(): boolean {
        let auto = [ChannelType.MTG, ChannelType.Tapjoy, ChannelType.Adcolony, ChannelType.TikTok]
        if (auto.indexOf(this.channelType) > -1) {
            return true
        } else {
            return false
        }
    }
}