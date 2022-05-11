import BasePayment from "./BasePayment";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Promptpay extends BasePayment {
    public name: string = 'promptpay'
    public titleUIColor: cc.Vec3 = cc.v3(0, 113, 241)
    public labelOutLineColor: cc.Vec3 = cc.v3(35, 116, 198)
    public btnColor: cc.Vec3 = cc.v3(0, 113, 241)

    public getFinishTitle(): string {
        return 'title_wide/' + this.name
    }
}