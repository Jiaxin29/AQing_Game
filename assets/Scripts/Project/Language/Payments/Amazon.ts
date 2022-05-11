import BasePayment from "./BasePayment";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Amazon extends BasePayment {
    public name: string = 'amazon'
    public titleUIColor: cc.Vec3 = cc.v3(0, 0, 0)
    public labelOutLineColor: cc.Vec3 = cc.v3(40, 40, 40)
    public btnColor: cc.Vec3 = cc.v3(0, 0, 0)
}