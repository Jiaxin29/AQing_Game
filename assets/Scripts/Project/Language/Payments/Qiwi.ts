import BasePayment from "./BasePayment";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Qiwi extends BasePayment {
    public name: string = 'qiwi'
    public titleUIColor: cc.Vec3 = cc.v3(241, 154, 20)
    public labelOutLineColor: cc.Vec3 = cc.v3(214, 121, 1)
    public btnColor: cc.Vec3 = cc.v3(241, 154, 20)
}