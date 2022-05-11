import BasePayment from "./BasePayment";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Grab extends BasePayment {
    public name: string = 'grab'
    public titleUIColor: cc.Vec3 = cc.v3(23, 153, 65)
    public labelOutLineColor: cc.Vec3 = cc.v3(10, 119, 45)
    public btnColor: cc.Vec3 = cc.v3(23, 153, 65)
}