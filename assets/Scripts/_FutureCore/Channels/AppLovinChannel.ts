import BaseChannel from "./BaseChannel";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AppLovinChannel extends BaseChannel {

    public checkReviewUI(_reviewUI: cc.Node) {
        let AppLovin_ReviewUI = _reviewUI.getChildByName('AppLovin')
        if (!AppLovin_ReviewUI) {
            return
        }

        AppLovin_ReviewUI.active = true
    }
}
