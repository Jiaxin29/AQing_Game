import BasePayment from "./BasePayment";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Dana extends BasePayment {
    public name: string = 'dana'
    public titleUIColor: cc.Vec3 = cc.v3(0, 143, 255)
    public labelOutLineColor: cc.Vec3 = cc.v3(35, 116, 198)
    public btnColor: cc.Vec3 = cc.v3(0, 143, 255)
}