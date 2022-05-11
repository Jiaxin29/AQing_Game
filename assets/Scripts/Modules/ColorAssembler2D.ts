import { PaymentType } from "../Project/Language/LanguageData";
import LanguageManager from "../Project/Language/LanguageManager";


const { ccclass, property, executeInEditMode, requireComponent, menu } = cc._decorator;

@ccclass
@executeInEditMode
@requireComponent(cc.RenderComponent)
export default class ColorAssembler2D extends cc.Component {
    // 颜色
    @property
    private _colors: cc.Color[] = []

    @property({ type: [cc.Color] })
    public get colors() {
        return this._colors
    }
    
    public set colors(colors) {
        this._colors = colors
        this._updateColors()
    }

    // 是否自动依据本地化调整颜色
    @property
    public _isAutoCheckLanguageColor: boolean = false

    @property({tooltip: '自动根据本地化更改颜色，颜色配置取决于PaypalUIColor，勾上则上面的color会无用到。且LanguageManager.checkIsUpdateLanguage为true才可以使用'})
    public get isAutoCheckLanguageColor() {
        return this._isAutoCheckLanguageColor
    }
    
    public set isAutoCheckLanguageColor(b: boolean) {
        this._isAutoCheckLanguageColor = b

        if (!b) {
            this.setDefaultColor()
        } else {
            this.testColorByPaymentType = PaymentType.Paypal
            this.updateLanguage()
        }
    }

    // 测试颜色
    public _testColorByPaymentType: PaymentType = PaymentType.Paypal

    @property({ type: cc.Enum(PaymentType), visible() { return this.isAutoCheckLanguageColor }, tooltip: '仅用于测试查看颜色'})
    public get testColorByPaymentType() {
        return this._testColorByPaymentType
    }
    
    public set testColorByPaymentType(t: PaymentType) {
        this._testColorByPaymentType = t
        this.updateLanguage()
    }

    onEnable() {
        cc.director.once(cc.Director.EVENT_AFTER_DRAW, this._updateColors, this);
    }

    start() {
        this.updateLanguage()
    }

    onDisable() {
        cc.director.off(cc.Director.EVENT_AFTER_DRAW, this._updateColors, this);
        this.node['_renderFlag'] |= cc['RenderFlow'].FLAG_COLOR;
    }

    // 更新颜色
    private _updateColors() {
        const cmp = this.getComponent(cc.RenderComponent);
        if (!cmp) return;
        const _assembler = cmp['_assembler'];
        if (!(_assembler instanceof cc['Assembler2D'])) return;
        const uintVerts = _assembler._renderData.uintVDatas[0];
        if (!uintVerts) return;
        const color = this.node.color;
        const floatsPerVert = _assembler.floatsPerVert;
        const colorOffset = _assembler.colorOffset;
        let count = 0;
        for (let i = colorOffset, l = uintVerts.length; i < l; i += floatsPerVert) {
            uintVerts[i] = (this.colors[count++] || color)['_val'];
        }
    }

    updateLanguage() {
        if (!this.isAutoCheckLanguageColor) {
            return
        }

        let paymentType: PaymentType = null
        if (!CC_EDITOR) {
            if (!LanguageManager.ME.checkIsUpdateLanguage()) {
                this.setDefaultColor()
                return
            }

            paymentType = LanguageManager.ME.currentCountry.PaymentType
        } else {  // 编辑器模式
            paymentType = this.testColorByPaymentType
        }

        // 右上颜色
        let v3 = LanguageManager.ME.currentCountry.paymentFile.titleUIColor
        let color3 = new cc.Color(v3.x, v3.y, v3.z, 255)
        this.colors[3] = color3
        
        // 左下颜色
        let color0 = cc.v3(this.colors[3].getR(), this.colors[3].getG(), this.colors[3].getB())
        color0 = color0.lerp(cc.v3(0, 0, 0), 0.3)
        this.colors[0] = new cc.Color(color0.x, color0.y, color0.z)

        // 右下，左上
        let numR = (this.colors[0].getR() + this.colors[3].getR()) / 2
        let numG = (this.colors[0].getG() + this.colors[3].getG()) / 2
        let numB = (this.colors[0].getB() + this.colors[3].getB()) / 2

        let color1 = cc.v3(numR, numG, numB)
        color1 = color1.lerp(color1.mul(Math.random() + 0.5), 0.5)

        let color2 = cc.v3(numR, numG, numB)
        color2 = color2.lerp(color2.mul(Math.random() + 0.5), 0.4)
        
        this.colors[1] = new cc.Color(color1.x, color1.y, color1.z)
        this.colors[2] = new cc.Color(color2.x, color2.y, color2.z)
        this._updateColors()
    }

    // 设置默认颜色
    setDefaultColor() {
        this._colors = [
            new cc.Color().fromHEX('#179AD5'),
            new cc.Color().fromHEX('#1C7BB9'),
            new cc.Color().fromHEX('#225B9C'),
            new cc.Color().fromHEX('#11235C'),
        ];
        this._updateColors()
    }
}