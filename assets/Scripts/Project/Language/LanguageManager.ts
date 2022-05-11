
import FChannelControl from "../../_FutureCore/ChannelControl/FChannelControl";
import GameManager from "../Main/GameManager";
import PGlobalUI from "../Main/PGlobalUI";
import BaseCountry from "./Countrys/BaseCountry";
import Brazil from "./Countrys/Brazil";
import Canada from "./Countrys/Canada";
import Egypt from "./Countrys/Egypt";
import England from "./Countrys/England";
import France from "./Countrys/France";
import Germany from "./Countrys/Germany";
import India from "./Countrys/India";
import Indonesian from "./Countrys/Indonesian";
import Italy from "./Countrys/Italy";
import Japan from "./Countrys/Japan";
import Korea from "./Countrys/Korea";
import Malaysia from "./Countrys/Malaysia";
import Mexico from "./Countrys/Mexico";
import Philippines from "./Countrys/Philippines";
import Romania from "./Countrys/Romania";
import Russia from "./Countrys/Russia";
import SaudiArabia from "./Countrys/SaudiArabia";
import SouthAfrica from "./Countrys/SouthAfrica";
import Spain from "./Countrys/Spain";
import Thailand from "./Countrys/Thailand";
import Turkey from "./Countrys/Turkey";
import UAE from "./Countrys/UAE";
import USA from "./Countrys/USA";
import Vietnam from "./Countrys/Vietnam";
import { Country, PaymentType } from "./LanguageData";


const {ccclass, property} = cc._decorator;

@ccclass
export default class LanguageManager extends cc.Component {
    public static ME: LanguageManager = null

    @property({
        type: cc.Enum(Country)
    })
    public country: Country = Country.USA
    
    public currentCountry: BaseCountry = null

    @property(cc.Label)
    public gameName: cc.Label = null  // 游戏名字

    @property(cc.Label)
    public secondName: cc.Label = null  // 第二名字

    @property(cc.Sprite)
    public icon: cc.Sprite = null  // icon

    @property(cc.Sprite)
    public installBtn: cc.Sprite = null  // install按钮
    
    @property({type: cc.Sprite, tooltip: "若不配置，这会去paypalUI中找title属性", })
    public title: cc.Sprite = null // 标题

    @property({type: cc.Sprite, tooltip: "若不配置，这会去paypalUI中找finishCard属性", })
    public finishCard: cc.Sprite = null  // 结束卡面

    @property({type: cc.Sprite, tooltip: "若不配置，这会去paypalUI中找finishTitle属性", })
    public finishTitle: cc.Sprite = null  // 结束标题

    // 横屏内容相关
    @property(cc.Sprite)
    public langscapeContent_Left_Icon: cc.Sprite = null

    @property(cc.Label)
    public langscapeContent_Left_GameName: cc.Label = null

    @property(cc.Label)
    public langscapeContent_Left_SecondName: cc.Label = null

    // @property(cc.Sprite)
    // public langscapeContent_Right_Logo: cc.Sprite = null  // 暂时手动填入

    @property(cc.Sprite)
    public langscapeContent_Right_InstallBtn: cc.Sprite = null

    onLoad () {
        LanguageManager.ME = this
    }

    start () {
        this.importCountry()
        this.printCountryName()
        this.resetLanguage()
    }

    resetLanguage() {
        if (!LanguageManager.ME.checkIsUpdateLanguage()) {
            return
        }

        if (!this.currentCountry) {
            console.log('[LanguageManager]import country error.check files of type = ', this.country)
            return
        }

        this.loadGameName()
        this.loadSecondName()
        this.loadIcon()
        this.loadInstallBtn()
        this.loadAndroidUrl()
        this.loadIosUrl()
        this.loadMoney()
        // this.loadTitle()
        this.loadFinishCard()
        this.loadLogo()
        
    }

    importCountry() {
        switch(this.country) {
            case Country.USA:
                this.currentCountry = this.node.addComponent(USA)
                break
            case Country.Thailand:
                this.currentCountry = this.node.addComponent(Thailand)
                break
            case Country.Indonesian:
                this.currentCountry = this.node.addComponent(Indonesian)
                break
            case Country.Brazil:
                this.currentCountry = this.node.addComponent(Brazil)
                break
            case Country.Spain:
                this.currentCountry = this.node.addComponent(Spain)
                break
            case Country.Vietnam:
                this.currentCountry = this.node.addComponent(Vietnam)
                break
            case Country.Russia:
                this.currentCountry = this.node.addComponent(Russia)
                break
            case Country.Malaysia:
                this.currentCountry = this.node.addComponent(Malaysia)
                break
            case Country.Philippines:
                this.currentCountry = this.node.addComponent(Philippines)
                break
            case Country.Japan:
                this.currentCountry = this.node.addComponent(Japan)
                break
            case Country.SaudiArabia:
                this.currentCountry = this.node.addComponent(SaudiArabia)
                break
            case Country.UAE:
                this.currentCountry = this.node.addComponent(UAE)
                break
            case Country.korea:
                this.currentCountry = this.node.addComponent(Korea)
                break
            case Country.Germany:
                this.currentCountry = this.node.addComponent(Germany)
                break
            case Country.Canada:
                this.currentCountry = this.node.addComponent(Canada)
                break
            case Country.England:
                this.currentCountry = this.node.addComponent(England)
                break
            case Country.France:
                this.currentCountry = this.node.addComponent(France)
                break
            case Country.Turkey:
                this.currentCountry = this.node.addComponent(Turkey)
                break
            case Country.SouthAfrica:
                this.currentCountry = this.node.addComponent(SouthAfrica)
                break
            case Country.Italy:
                this.currentCountry = this.node.addComponent(Italy)
                break
            case Country.Mexico:
                this.currentCountry = this.node.addComponent(Mexico)
                break
            case Country.India:
                this.currentCountry = this.node.addComponent(India)
                break
            case Country.Romania:
                this.currentCountry = this.node.addComponent(Romania)
                break
            case Country.Egypt:
                this.currentCountry = this.node.addComponent(Egypt)
                break
        }
    }

    loadGameName() {
        if (!this.gameName) {
            return
        }

        if (!this.currentCountry.GameName) {
            return
        }

        if (this.currentCountry.GameName.indexOf('-Gamename') > -1) {
            return
        }

        let gameName = this.currentCountry.GameName || ''
        this.gameName.string = gameName

        if (this.langscapeContent_Left_GameName) {
            this.langscapeContent_Left_GameName.string = gameName
        }
    }

    loadSecondName() {
        if (!this.secondName) {
            return
        }

        if (!this.currentCountry.SecondName) {
            return
        }

        let secondName = this.currentCountry.SecondName
        this.secondName.string = secondName

        if (this.langscapeContent_Left_SecondName) {
            this.langscapeContent_Left_SecondName.string = secondName
        }
    }

    loadIcon() {
        if (!this.icon) {
            return
        }

        let icon = this.currentCountry.Icon
        this.loadSprite(this.icon, icon)

        if (this.langscapeContent_Left_Icon) {
            this.loadSprite(this.langscapeContent_Left_Icon, icon)
        }
    }

    loadAndroidUrl() {
        let url = this.currentCountry.AndroidUrl
        if (!url) {
            return
        }

        FChannelControl.Me.androidAppUrl = url
        FChannelControl.Me.resetChannelUrl()
    }

    loadIosUrl() {
        let url = this.currentCountry.IosUrl
        if (!url) {
            return
        }

        FChannelControl.Me.iOSAppUrl = url
        FChannelControl.Me.resetChannelUrl()
    }

    loadMoney() {
        if (GameManager.ME.isSkinGame || GameManager.ME.isBitCoinGame || GameManager.ME.isDogeCoinGame) {
            return
        }
        
        let money = []
        let config = this.currentCountry.MoneyConfig
        if (GameManager.ME.isShortGame) {
            money.push(config.data[0])
            money.push(config.data[config.data.length - 1])
        } else {
            money = money.concat(config.data)
        }

        PGlobalUI.Me.payPalUI.Config_PPNum = money
        PGlobalUI.Me.payPalUI.symbol = config.symbol
    }

    // loadTitle() {
    //     let title = this.title
    //     if (!title) {
    //         title = PGlobalUI.Me.payPalUI ? PGlobalUI.Me.payPalUI.title : null
    //     }

    //     if (!title) {
    //         return
    //     }

    //     let sp = this.currentCountry.paymentFile.getTitle()
    //     this.loadSprite(title, sp)
    // }

    loadFinishCard() {
        let finishCard = this.finishCard
        if (!finishCard) {
            finishCard = PGlobalUI.Me.finishUI ? PGlobalUI.Me.finishUI.finishCard : null
        }

        if (!finishCard) {
            return
        }

        let config = this.currentCountry.paymentFile.getFinishCard()
        this.loadSprite(finishCard, config.bg)

        let finishTitle = this.finishTitle
        if (!finishTitle) {
            finishTitle = PGlobalUI.Me.finishUI ? PGlobalUI.Me.finishUI.finishTitle : null
        }
        
        if (config.node && finishTitle) {
            this.loadSprite(finishTitle, config.node)
        }

        // 字体位置
        if (config.fontOffset) {
            let money = finishCard.node.getChildByName('money')
            if (money) {
                money.x += config.fontOffset.x
                money.y += config.fontOffset.y
            }
        }

        // 字体颜色
        if (config.fontColor) {
            let money = finishCard.node.getChildByName('money')
            if (money) {
                let color = cc.color(config.fontColor.x, config.fontColor.y, config.fontColor.z, 255)
                money.color = color
            }
        }

        // 字体大小
        if (config.fontSize) {
            let money = finishCard.node.getChildByName('money')
            if (money) {
                money.getComponent(cc.Label).fontSize = config.fontSize
                money.getComponent(cc.Label).lineHeight = config.fontSize
            }
        }

        // 描边
        if (config.labelOutLineColor) {
            let money = finishCard.node.getChildByName('money')
            if (money) {
                let outLine = money.getComponent(cc.LabelOutline)
                if (outLine) {
                    outLine.enabled = true
                    let color = cc.color(config.labelOutLineColor.x, config.labelOutLineColor.y, config.labelOutLineColor.z, 255)
                    outLine.color = color
                }
            }
        }

    }

    loadInstallBtn() {
        if (!this.installBtn) {
            return
        }

        let config = this.currentCountry.InstallBtn
        if (!config) {
            return
        }
        
        this.loadSprite(this.installBtn, config.bg)

        if (config.font) {
            let node = this.installBtn.node.getChildByName('label')
            if (!node) {
                node = new cc.Node()
                node.parent = this.installBtn.node
                node.addComponent(cc.Label)
            }

            let label = node.getComponent(cc.Label)
            label.string = config.font
        }

        if (this.langscapeContent_Right_InstallBtn) {
            this.loadSprite(this.langscapeContent_Right_InstallBtn, config.bg)
            if (config.font) {
                let node = this.langscapeContent_Right_InstallBtn.node.getChildByName('label')
                if (!node) {
                    node = new cc.Node()
                    node.parent = this.langscapeContent_Right_InstallBtn.node
                    node.addComponent(cc.Label)
                }

                let label = node.getComponent(cc.Label)
                label.string = config.font
            }
        }
    }

    // 加载logo，暂时手动填入
    loadLogo() {
        return
    }

    // =========================================================================

    // 加载sprite
    loadSprite(sprite: cc.Sprite | cc.ParticleSystem, path: string) {
        if (!sprite) {
            return
        }

        if (!path) {
            return
        }

        let bool = sprite.node.active
        sprite.node.active = false
        cc.loader.loadRes(path, cc.SpriteFrame, (error, sp)=>{
            if (bool) {
                sprite.node.active = true 
            }
            
            if (error) {
                return
            }

            sprite.spriteFrame = sp
        })
    }

    // 打印输出
    printCountryName() {
        if (!this.currentCountry) {
            console.log('[LanguageManager]import country error.check files of type = ', this.country)
            return
        }

        for (let key in Country) {
            console.log('[LanguageManager] Country:', Country[key], key)
        }
        console.log('[LanguageManager] Current Country', this.country)
    }

    // 是否可以检测
    checkIsUpdateLanguage(): boolean {
        return !(LanguageManager.ME.country == Country.USA && LanguageManager.ME.currentCountry.PaymentType == PaymentType.Paypal)
    }
    // update (dt) {}
}
