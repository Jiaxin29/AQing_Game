
const {ccclass, property} = cc._decorator;

@ccclass
export default class BaseChannel extends cc.Component {
    public buildID: string = '0'
    public isGameRetry: boolean = false
    public url: string = null

    public onGameReady() {
        console.log('BaseChannel.onGameReady')
    }

    public onGameRetry(){
        console.log('BaseChannel.onGameRetry')
    }

    public onInstall(){
        if (!this.url) {
            return
        }
        
        console.log('BaseChannel.onInstall', this.url)
        try {
            mraid.open(this.url)
		} catch (error) { }
    }

    public onGameEnd(){
        console.log('BaseChannel.onGameEnd')
    }

    public setBuildId(_buildID: string) {
        this.buildID = _buildID
    }

    public setGameRetry(_isGameRetry: boolean) {
        this.isGameRetry = _isGameRetry
    }

    public setUrl(_url: string) {
        this.url = _url
    }
    
    public checkReviewUI(_reviewUI: cc.Node) {

    }
    // update (dt) {}
}
