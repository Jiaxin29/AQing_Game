import BasePayment from "./BasePayment";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Truemoney extends BasePayment {
    public name: string = 'truemoney'
    public titleUIColor: cc.Vec3 = cc.v3(255, 164, 46)
    public labelOutLineColor: cc.Vec3 = cc.v3(214, 121, 1)
    public btnColor: cc.Vec3 = cc.v3(239, 139, 20)
}