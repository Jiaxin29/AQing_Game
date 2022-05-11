import BasePayment from "./BasePayment";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Momo extends BasePayment {
    public name: string = 'momo'
    public titleUIColor: cc.Vec3 = cc.v3(195, 29, 132)
    public labelOutLineColor: cc.Vec3 = cc.v3(139, 0, 139)
    public btnColor: cc.Vec3 = cc.v3(195, 29, 132)
}