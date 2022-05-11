import BaseChannel from "./BaseChannel";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FacebookChannel extends BaseChannel {
    public onInstall(){
        console.log('FacebookChannel.onInstall')
        try {
            FbPlayableAd.onCTAClick()
		} catch (error) { }
    }
}
