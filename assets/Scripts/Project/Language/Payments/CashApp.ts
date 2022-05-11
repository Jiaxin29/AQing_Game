import BasePayment from "./BasePayment";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CashApp extends BasePayment {
    public name: string = 'cashapp'
    public titleUIColor: cc.Vec3 = cc.v3(27, 195, 94)
    public labelOutLineColor: cc.Vec3 = cc.v3(10, 119, 45)
    public btnColor: cc.Vec3 = cc.v3(27, 195, 94)
}