import BasePayment from "./BasePayment";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BBVA extends BasePayment {
    public name: string = 'bbva'
    public titleUIColor: cc.Vec3 = cc.v3(21, 90, 175)
    public labelOutLineColor: cc.Vec3 = cc.v3(51, 27, 121)
    public btnColor: cc.Vec3 = cc.v3(21, 90, 175)
}