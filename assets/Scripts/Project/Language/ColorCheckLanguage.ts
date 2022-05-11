import GameManager from "../Main/GameManager";
import LanguageManager from "./LanguageManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property
    public isOutLine: boolean = false

    @property
    public isFade: boolean = false

    @property
    public isBtn: boolean = false

    @property
    public isPaypal: boolean = false

    onLoad () {
        
    }

    start () {
        if (GameManager.ME.isSkinGame) {
            return
        }

        if (!LanguageManager.ME.checkIsUpdateLanguage()) {
            return
        }

        if (this.isPaypal) {
            this.updatePaypalColor()
            return
        }

        if (this.isOutLine) {
            this.updateOutLine()
            return
        }

        if (this.isFade) {
            this.updateFadeColor()
            return
        }

        if (this.isBtn) {
            this.updateBtnColor()
            return
        }
    }

    updateOutLine() {
        let labelOutLine = this.node.getComponent(cc.LabelOutline)
        if (!labelOutLine) {
            return
        }

        let color = LanguageManager.ME.currentCountry.paymentFile.labelOutLineColor
        if (!color) {
            return
        }

        labelOutLine.color = cc.color(color.x, color.y, color.z)
    }

    updatePaypalColor() {
        let color = LanguageManager.ME.currentCountry.paymentFile.titleUIColor
        if (!color) {
            return
        }

        this.node.color = cc.color(color.x, color.y, color.z)
    }

    updateBtnColor() {
        let color = LanguageManager.ME.currentCountry.paymentFile.btnColor
        if (!color) {
            return
        }

        this.node.color = cc.color(color.x, color.y, color.z)
    }

    // 透明色，稍微调亮点
    updateFadeColor() {
        let color = LanguageManager.ME.currentCountry.paymentFile.btnColor
        let temp = [color.x, color.y, color.z]
        let top = temp[0]
        for (let c of temp) {
            if (top < c) {
                top = c
            }
        }
        
        for (let i = 0; i < temp.length; i++) {
            if (temp[i] == top) {
                let r = 255 - top
                temp[i] = temp[i] + r / 2
                continue
            }

            let sub = top - temp[i]
            temp[i] = temp[i] + sub / 2
        }
        
        this.node.color = cc.color(temp[0], temp[1], temp[2])
    }
    // update (dt) {}
}
