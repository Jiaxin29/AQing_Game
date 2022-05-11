import BaseChannel from "./BaseChannel";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TikTokChannel extends BaseChannel {
    public onInstall(){
        console.log('TikTokChannel.onInstall')
        try {
            window.openAppStore()
		} catch (error) { }
    }
}
