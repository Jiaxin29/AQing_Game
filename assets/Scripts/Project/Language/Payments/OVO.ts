import BasePayment from "./BasePayment";

const {ccclass, property} = cc._decorator;

@ccclass
export default class OVO extends BasePayment {
    public name: string = 'ovo'
    public titleUIColor: cc.Vec3 = cc.v3(74, 50, 143)
    public labelOutLineColor: cc.Vec3 = cc.v3(51, 27, 121)
    public btnColor: cc.Vec3 = cc.v3(74, 50, 143)
}