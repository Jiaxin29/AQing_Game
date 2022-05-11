import BasePayment from "./BasePayment";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Gcash extends BasePayment {
    public name: string = 'gcash'
    public titleUIColor: cc.Vec3 = cc.v3(0, 96, 230)
    public labelOutLineColor: cc.Vec3 = cc.v3(8, 85, 199)
    public btnColor: cc.Vec3 = cc.v3(0, 96, 230)
}