import BaseChannel from "./BaseChannel";

const {ccclass, property} = cc._decorator;

@ccclass
export default class KwaiChannel extends BaseChannel {
    public onGameReady() {
        console.log('KwaiChannel.onGameReady')
        try {
            window.ks_playable_exposurePage()
            window.ks_playable_startPlay()
		} catch (error) { }
    }

    public onInstall(){
        console.log('KwaiChannel.onInstall')
        try {
            window.ks_playable_openAppStore()
		} catch (error) { }
    }
}
