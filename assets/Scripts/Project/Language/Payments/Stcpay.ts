import BasePayment from "./BasePayment";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Stcpay extends BasePayment {
    public name: string = 'stcpay'
    public titleUIColor: cc.Vec3 = cc.v3(127, 59, 228)
    public labelOutLineColor: cc.Vec3 = cc.v3(115, 50, 192)
    public btnColor: cc.Vec3 = cc.v3(127, 59, 228)
}