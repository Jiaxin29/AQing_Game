import BaseChannel from "./BaseChannel";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AdcolonyChannel extends BaseChannel {

    public checkReviewUI(_reviewUI: cc.Node) {
        let Adcolony_ReviewUI = _reviewUI.getChildByName('Adcolony')
        if (!Adcolony_ReviewUI) {
            return
        }

        Adcolony_ReviewUI.active = true
    }
}
