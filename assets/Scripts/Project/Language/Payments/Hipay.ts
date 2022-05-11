import BasePayment from "./BasePayment";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Hipay extends BasePayment {
    public name: string = 'hipay'
    public titleUIColor: cc.Vec3 = cc.v3(0, 143, 255)
    public labelOutLineColor: cc.Vec3 = cc.v3(35, 116, 198)
    public btnColor: cc.Vec3 = cc.v3(0, 143, 255)

    public getGetCardIcon(): string {
        return 'getcard_icon/diamond'
    }

    public getFinishBg(): string {
        return 'finish/pic_big_paypal_di'
    }

    public getFinishTitle(): string {
        return 'title_wide/' + this.name
    }
}