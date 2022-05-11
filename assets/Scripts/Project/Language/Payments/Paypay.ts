import BasePayment from "./BasePayment";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Paypay extends BasePayment {
    public name: string = 'paypay'
    public titleUIColor: cc.Vec3 = cc.v3(242, 46, 22)
    public labelOutLineColor: cc.Vec3 = cc.v3(198, 58, 41)
    public btnColor: cc.Vec3 = cc.v3(242, 46, 22)
}