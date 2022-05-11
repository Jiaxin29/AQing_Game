import BasePayment from "./BasePayment";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Zalopay extends BasePayment {
    public name: string = 'zalopay'
    public titleUIColor: cc.Vec3 = cc.v3(0, 188, 153)
    public labelOutLineColor: cc.Vec3 = cc.v3(0, 152, 124)
    public btnColor: cc.Vec3 = cc.v3(0, 188, 153)
}