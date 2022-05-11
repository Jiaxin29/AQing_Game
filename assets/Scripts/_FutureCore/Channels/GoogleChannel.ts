import BaseChannel from "./BaseChannel";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GoogleChannel extends BaseChannel {

    public checkReviewUI(_reviewUI: cc.Node) {
        let Google_ReviewUI = _reviewUI.getChildByName('Google')
        if (!Google_ReviewUI) {
            return
        }

        Google_ReviewUI.active = true
    }
}
