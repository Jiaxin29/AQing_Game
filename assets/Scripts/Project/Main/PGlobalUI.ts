/*
    aoemo.com
*/

import FinishUI from "../UI/FinishUI";
import GetCardUI from "../UI/GetCardUI";
import PayPalUI from "../UI/PayPalUI";

const { ccclass, property, executeInEditMode} = cc._decorator;

@ccclass
@executeInEditMode
export default class PGlobalUI extends cc.Component {
    public static Me: PGlobalUI = null;

    @property({type: PayPalUI, tooltip: '不需要配置，会根据不同的顶部栏配置不同的PaypalUI'})
    payPalUI: PayPalUI = null;

    @property(GetCardUI)
    getCardUI: GetCardUI = null;

    @property({type: FinishUI, tooltip: '不需要配置，会根据不同的游戏类型配置不同FinishUI'})
    finishUI: FinishUI = null;

    onLoad() {
        PGlobalUI.Me = this;
    }
}