import FChannelControl from "../../_FutureCore/ChannelControl/FChannelControl";
import { FMgr } from "../../_FutureCore/Manager/FMgr";
import LanguageManager from "../Language/LanguageManager";
import GameManager from "../Main/GameManager";
import PGlobalUI from "../Main/PGlobalUI";
import FinishLabel from "./FinishLabel";

const { ccclass, property, executeInEditMode} = cc._decorator;
const ShowDelayTime: number = 0.2

@ccclass
@executeInEditMode
export default class FinishUI extends cc.Component {
    public particleBackNode: cc.Node = null
    
    @property(cc.Label)
    public cashLabel: cc.Label = null

    @property(cc.Node)
    public hand: cc.Node = null

    @property(cc.Node)
    public btn: cc.Node = null

    @property(cc.Node)
    public glass: cc.Node = null

    @property(cc.Sprite)
    public finishCard: cc.Sprite = null

    @property(cc.Sprite)
    public finishTitle: cc.Sprite = null

    onLoad() {
        PGlobalUI.Me.finishUI = this

        this.particleBackNode = this.node.getChildByName('particleBackNode')
    }

    start() {
        if (CC_EDITOR) {
            return
        }

        this.setParticleActive(false)
    }

    onTouchInstallStart(e: cc.Event.EventTouch) {
        FMgr.Audio.PlayEffect('frame_install')
        FChannelControl.Me.onInstall()
    }

    gameEnd(money?: number) {
        if (!money) {
            money = PGlobalUI.Me.payPalUI.ppCoin
        }

        GameManager.ME.isGameEndAfterAni = true

        cc.log("[FinishUI]gameEnd");
        FMgr.Audio.PlayEffect('firework', 0.7)
        FMgr.Audio.PlayEffect('award', 0.7)
        FMgr.Audio.PlayEffect('win', 0.7)
        FChannelControl.Me.onGameEnd()

        this.showThisLayout()
        this.showMoneyLabel(money)
        this.showHand()
        this.showBtn()
        this.showGlass()
    }

    // 显示此界面
    showThisLayout() {
        this.node.active = true
        this.node.opacity = 0
        let scale = this.node.scale
        this.node.scale = 0.3

        cc.tween(this.node).delay(ShowDelayTime).to(0.2, {opacity: 255, scale: scale + 0.1}).to(0.07, {scale: scale}).call(()=>{
            this.setParticleActive(true)
        }).start()
    }

    // 金额
    showMoneyLabel(money: number) {
        cc.tween(this.cashLabel).delay(ShowDelayTime).call(()=>{
            this.cashLabel.getComponent(FinishLabel).setMoney(money)
        }).start()
    }

    // 手
    showHand() {
        let moveOffset = 30
        cc.tween(this.hand).repeatForever(
            cc.tween().by(0.3, {x: moveOffset, y: -moveOffset}).by(0.3, {x: -moveOffset, y: moveOffset})
        ).start()
    }

    // 按钮
    showBtn() {
        let scale = this.btn.scale
        cc.tween(this.btn).repeatForever(
            cc.tween().to(0.3, {scale: scale - 0.1}).to(0.3, {scale: scale})
        ).start()
    }

    // 玻璃
    showGlass() {
        this.glass.active = LanguageManager.ME.checkIsUpdateLanguage()
    }

    setParticleActive(isShow: boolean = false) {
        if (!this.particleBackNode) {
            return
        }

        this.particleBackNode.children.forEach(child =>{
            child.active = isShow
        })
    }
}
