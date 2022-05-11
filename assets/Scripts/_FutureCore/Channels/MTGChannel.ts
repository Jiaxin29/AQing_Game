import BaseChannel from "./BaseChannel";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MTGChannel extends BaseChannel {

    public onGameReady() {
        console.log('MTGChannel.onGameReady')

        try {
            window.gameReady && window.gameReady();
        } catch (error) { }
    }

    public onGameRetry(){
        console.log('MTGChannel.onGameRetry')
        
        try {
            if (this.isGameRetry) {
                //window.gameRetry && window.gameRetry();
            }
        } catch (error) { }  
    }

    public onInstall(){
        console.log('MTGChannel.onInstall')

        try {
            window.install && window.install();
            super.onInstall()
		} catch (error) { }
    }

    public onGameEnd(){
        console.log('MTGChannel.onGameEnd')

        try {
            window.gameEnd && window.gameEnd()
        } catch (error) { }
    }

    public checkReviewUI(_reviewUI: cc.Node) {
        let MTG_ReviewUI = _reviewUI.getChildByName('MTG')
        if (!MTG_ReviewUI) {
            return
        }

        MTG_ReviewUI.active = true
    }
}
