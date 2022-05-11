import BaseChannel from "./BaseChannel";

const {ccclass, property} = cc._decorator;

@ccclass
export default class IronsrcChannel extends BaseChannel {

    public onGameReady() {
        console.log('IronsrcChannel.onGameReady')
        try {
            dapi.isReady()
            dapi.getScreenSize()
            dapi.getAudioVolume()
            dapi.addEventListener("audioVolumeChange",this.audioVolumeChangeCallback);
        } catch (error) { }
    }

    public onGameRetry(){
        // console.log('IronsrcChannel.onGameRetry')
        
        try {
            if (this.isGameRetry) {
                //window.gameRetry && window.gameRetry();
            }
        } catch (error) { }  
    }

    public onInstall(){
        console.log('IronsrcChannel.onInstall', this.url)
        try {
            dapi.openStoreUrl()
            // dapi.open(this.url)
        } catch (error) { }
    }

    public onGameEnd(){
        console.log('IronsrcChannel.onGameEnd')

        try {
            // window.gameEnd && window.gameEnd()
        } catch (error) { }
    }

    public checkReviewUI(_reviewUI: cc.Node) {
        let Isonsrc_ReviewUI = _reviewUI.getChildByName('Ironsrc')
        if (!Isonsrc_ReviewUI) {
            return
        }

        Isonsrc_ReviewUI.active = true
    }

    private audioVolumeChangeCallback() {
        
    }
}
