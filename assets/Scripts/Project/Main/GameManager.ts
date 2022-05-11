import { GameEventEnum, SkinCardType } from "../Data/EventEnum";
import { GameEvent } from "./EventDispatcher";
import PGlobalUI from "./PGlobalUI";

const {ccclass, property} = cc._decorator;

// 比特币配置
const BitCoinGameConfig = {
    moneyConfig: [0, 0.00024, 0.00169, 0.13764],
    symbol: 'BTC',
    decimal: 5,
}

// 狗狗币配置
const DogeCoinGameConfig = {
    moneyConfig: [0, 2000, 4000, 6000],
    symbol: 'DOGE',
    decimal: 2,
}

// 皮肤配置
const SkinGameConfig = {
    moneyConfig: [0, 1911, 4732, 10000],
    symbol: '',
    decimal: 0,
}

@ccclass
export default class GameManager extends cc.Component {
    public static ME: GameManager = null
    public isGameEnd: boolean = false  // 游戏结束，动画前判断
    public isGameEndAfterAni: boolean = false  // 游戏结束，动画后判断

    @property
    public isShortGame: boolean = false
    
    @property({tooltip: '是否是礼包游戏。若是的话勾上后要把skinCardType选择为对应的类型'})
    public isSkinGame: boolean = false

    @property({type: cc.Enum(SkinCardType), visible() { return this.isSkinGame }}) 
    public skinCardType: SkinCardType = SkinCardType.NONE

    @property({tooltip: '是否是比特币游戏'})
    public isBitCoinGame: boolean = false

    @property({tooltip: '是否是狗狗币游戏。若比特币和狗狗币都需要展示，那么勾选主要展示的货币即可'})
    public isDogeCoinGame: boolean = false

    onLoad () {
        GameManager.ME = this
    }

    start () {
        this.updateGameType()
        GameEvent.emit(GameEventEnum.SET_SHORT_GAME, this.isShortGame)
    }

    updateGameType() {
        if (this.isSkinGame) {
            this.changeToSkinGame()
        } else if (this.isBitCoinGame) {
            this.changeToBitCoinGame()
        } else if (this.isDogeCoinGame) {
            this.changeToDogeCoinGame()
        }
    }

    // 皮肤礼包游戏
    changeToSkinGame() {
        let paypal = PGlobalUI.Me.payPalUI
        if (!paypal) {
            return
        }

        // 比特币配置
        paypal.Config_PPNum = SkinGameConfig.moneyConfig
        paypal.symbol = SkinGameConfig.symbol
        paypal.decimal = SkinGameConfig.decimal
        return
        
        let baseNode = paypal.baseNode
        if (baseNode) {
            baseNode.active = false
        }

        let logo = paypal.logo
        if (logo) {
            logo.active = true
        }
    }

    // 比特币游戏
    changeToBitCoinGame() {
        let paypal = PGlobalUI.Me.payPalUI
        if (!paypal) {
            return
        }

        // 比特币配置
        paypal.Config_PPNum = BitCoinGameConfig.moneyConfig
        paypal.symbol = BitCoinGameConfig.symbol
        paypal.decimal = BitCoinGameConfig.decimal
    }

    // 狗狗币游戏
    changeToDogeCoinGame() {
        let paypal = PGlobalUI.Me.payPalUI
        if (!paypal) {
            return
        }

        // 比特币配置
        paypal.Config_PPNum = DogeCoinGameConfig.moneyConfig
        paypal.symbol = DogeCoinGameConfig.symbol
        paypal.decimal = DogeCoinGameConfig.decimal
    }
    // update (dt) {}
}
