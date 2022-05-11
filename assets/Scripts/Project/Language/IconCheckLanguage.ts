import GameManager from "../Main/GameManager";
import { Country } from "./LanguageData";
import LanguageManager from "./LanguageManager";

const {ccclass, property} = cc._decorator;

@ccclass('IconCheckLanguageList')
class IconCheckLanguageList {
    @property({type: cc.Enum(Country)})
    chooseCountry: Country = Country.USA
    
    @property(cc.SpriteFrame)
    img: cc.SpriteFrame = null
}

@ccclass
export default class NewClass extends cc.Component {
    @property
    public isAutoCheckIcon: boolean = true

    @property(cc.SpriteFrame)
    public diamond: cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    public bitCoin: cc.SpriteFrame = null

    @property(cc.SpriteFrame)
    public dogeCoin: cc.SpriteFrame = null
    
    @property([IconCheckLanguageList])
    public checkList: IconCheckLanguageList[] = []

    /// 若勾选了isAutoCheckIcon，从这里选取
    @property({tooltip: "若勾选了isAutoCheckIcon，从resource/title选取"})
    public title: boolean = false

    @property({tooltip: "若勾选了isAutoCheckIcon，从这resource/finish选取"})
    public finish: boolean = false

    @property({tooltip: "若勾选了isAutoCheckIcon，从resource/getcard_icon选取"})
    public icon: boolean = true

    onLoad () {
        
    }

    start () {
        this.checkLanguage()
    }

    checkLanguage() {
        if (GameManager.ME.isSkinGame) {
            this.changeToDiamond()
            return
        }

        if (GameManager.ME.isBitCoinGame) {
            this.changeToBitCoin()
            return
        }

        if (GameManager.ME.isDogeCoinGame) {
            this.changeToDogeCoin()
            return
        }

        if (!LanguageManager.ME.checkIsUpdateLanguage()) {
            return
        }

        this.checkSprite()
        this.checkParticle()
    }

    checkSprite() {
        let sprite = this.node.getComponent(cc.Sprite)
        if (!sprite) {
            return
        }

        let sp = null
        for (let i = 0; i < this.checkList.length; i++) {
            let data = this.checkList[i]
            if (data.chooseCountry == LanguageManager.ME.country) {
                sp = data.img
                break                
            }
        }

        if (!sp) {
            this.autoCheckIcon(sprite)
            return
        }

        sprite.spriteFrame = sp
    }

    checkParticle() {
        let particle = this.node.getComponent(cc.ParticleSystem)
        if (!particle) {
            return
        }

        let sp = null
        for (let i = 0; i < this.checkList.length; i++) {
            let data = this.checkList[i]
            if (data.chooseCountry == LanguageManager.ME.country) {
                sp = data.img
                break          
            }
        }

        if (!sp) {
            this.autoCheckIcon(particle)
            return
        }
        
        particle.spriteFrame = sp
    }

    autoCheckIcon(sprite: cc.Sprite | cc.ParticleSystem) {
        if (!this.isAutoCheckIcon) {
            return
        }

        let getCardIcon = null
        if (this.title) {
            getCardIcon = LanguageManager.ME.currentCountry.paymentFile.getTitle()
        } else if (this.finish) {
            getCardIcon = LanguageManager.ME.currentCountry.paymentFile.getFinishTitle()
        } else if (this.icon) {
            getCardIcon = LanguageManager.ME.currentCountry.paymentFile.getGetCardIcon()
        }

        LanguageManager.ME.loadSprite(sprite, getCardIcon)
    }

    changeToDiamond() {
        if (!this.diamond) {
            return
        }

        let sprite = this.node.getComponent(cc.Sprite)
        if (sprite) {
            sprite.spriteFrame = this.diamond
        }

        let particle = this.node.getComponent(cc.ParticleSystem)
        if (particle) {
            particle.spriteFrame = this.diamond
        }
    }

    // 比特币
    changeToBitCoin() {
        if (!this.bitCoin) {
            return
        }

        let sprite = this.node.getComponent(cc.Sprite)
        if (sprite) {
            sprite.spriteFrame = this.bitCoin
        }

        let particle = this.node.getComponent(cc.ParticleSystem)
        if (particle) {
            particle.spriteFrame = this.bitCoin
        }
    }

    // 狗狗币
    changeToDogeCoin() {
        if (!this.dogeCoin) {
            return
        }

        let sprite = this.node.getComponent(cc.Sprite)
        if (sprite) {
            sprite.spriteFrame = this.dogeCoin
        }

        let particle = this.node.getComponent(cc.ParticleSystem)
        if (particle) {
            particle.spriteFrame = this.dogeCoin
        }
    }
    // update (dt) {}
}
