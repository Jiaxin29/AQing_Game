import BaseChannel from "./BaseChannel";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BigoChannel extends BaseChannel {

    public onGameReady() {
        console.log('BigoChannel.onGameReady')

        try {
            window.BGY_MRAID && window.BGY_MRAID.gameReady()
        } catch (error) { }
    }

    public onInstall(){
        console.log('BigoChannel.onInstall')

        try {
            window.BGY_MRAID && window.BGY_MRAID.open()
            super.onInstall()
		} catch (error) { }
    }

    public onGameEnd(){
        console.log('BigoChannel.onGameEnd')

        try {
            window.BGY_MRAID && window.BGY_MRAID.gameEnd()
        } catch (error) { }
    }
}
