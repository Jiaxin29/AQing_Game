import { SkinCardType } from "../Project/Data/EventEnum";
import GameManager from "../Project/Main/GameManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SkinImgSwitch extends cc.Component {
    @property(cc.SpriteFrame) public roboloxImg: cc.SpriteFrame = null
    @property(cc.SpriteFrame) public freefireImg: cc.SpriteFrame = null
    @property(cc.SpriteFrame) public brawlstarsImg: cc.SpriteFrame = null
    @property(cc.SpriteFrame) public mobileLegendImg: cc.SpriteFrame = null

    @property(cc.Node)
    public label: cc.Node = null

    onLoad () {
        
    }

    start () {
        if (!GameManager.ME.isSkinGame) {
            return
        }

        this.updateImg()
    }

    updateImg() {
        let sp = this.node.getComponent(cc.Sprite)
        if (!sp) {
            return
        }

        if (GameManager.ME.skinCardType == SkinCardType.ROBOLOX) {
            sp.spriteFrame = this.roboloxImg
            this.label.active = true
            return
        }

        if (GameManager.ME.skinCardType == SkinCardType.FREEFIRE) {
            sp.spriteFrame = this.freefireImg
            this.label.active = true
            return
        }

        if (GameManager.ME.skinCardType == SkinCardType.BRAWLSTARS) {
            sp.spriteFrame = this.brawlstarsImg
            this.label.active = true
            return
        }

        if (GameManager.ME.skinCardType == SkinCardType.MOBILELEGEND) {
            sp.spriteFrame = this.mobileLegendImg
            this.label.active = true
            return
        }

        this.label.active = false
    }
    // update (dt) {}
}
