import BasePayment from "./BasePayment";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Boost extends BasePayment {
    public name: string = 'boost'
    public titleUIColor: cc.Vec3 = cc.v3(242, 46, 22)
    public labelOutLineColor: cc.Vec3 = cc.v3(198, 58, 41)
    public btnColor: cc.Vec3 = cc.v3(242, 46, 22)
}