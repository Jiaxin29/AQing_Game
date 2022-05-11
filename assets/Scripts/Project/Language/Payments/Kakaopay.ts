import BasePayment from "./BasePayment";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Kakaopay extends BasePayment {
    public name: string = 'kakaopay'
    public titleUIColor: cc.Vec3 = cc.v3(235, 242, 38)
    public labelOutLineColor: cc.Vec3 = cc.v3(112, 100, 26)
    public btnColor: cc.Vec3 = cc.v3(235, 242, 38)
}