
const {ccclass, property} = cc._decorator;

@ccclass
export default class BasePayment extends cc.Component {
    public name: string = ''
    public titleUIColor: cc.Vec3 = cc.v3(0, 0, 0)
    public labelOutLineColor: cc.Vec3 = cc.v3(0, 0, 0)
    public btnColor: cc.Vec3 = cc.v3(0, 0, 0)

    // 标题
    public getTitle(): string {
        return 'language/title_wide/' + this.name
    }

    // 得卡界面
    public getGetCard(): {bg: string, node?: string} {
        return {bg: 'common/card_bg', node: 'language/title_wide/' + this.name}
    }

    // 得卡小标记
    public getGetCardIcon(): string {
        return 'language/getcard_icon/' + this.name
    }

    // 结束卡
    public getFinishCard(): {bg: string, node?: string, labelOutLineColor?: cc.Vec3, fontOffset?: cc.Vec2, fontColor?: cc.Vec3, fontSize?: number} {
        let finishBg = this.getFinishBg()
        let finishTitle = this.getFinishTitle()
        let outLineColor = this.labelOutLineColor || cc.v3(35, 116, 198)
        
        return {bg: finishBg, node: finishTitle, labelOutLineColor: outLineColor, fontOffset: cc.v2(0, 0), fontColor: cc.v3(255, 255, 255), fontSize: 80}
    }

    // 结束背景图
    public getFinishBg(): string {
        return 'language/finish/pic_big_' + this.name + '_di'
    }

    // 结束标题
    public getFinishTitle(): string {
        return 'language/finish/pic_big_' + this.name
    }
}
