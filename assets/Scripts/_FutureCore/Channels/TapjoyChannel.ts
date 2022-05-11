import BaseChannel from "./BaseChannel";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TapjoyChannel extends BaseChannel {

    public onGameReady() {
        try {
            console.log('TapjoyChannel.onGameReady')
            this.Tapjoy_setPlayableBuild()
            this.Tapjoy_skipAd()
        } catch (error) { }
    }

    public onInstall(){
        console.log('TapjoyChannel.onInstall')
    
        try {
            let userAnsweredCTA = true;
            if (userAnsweredCTA) {
                window.TJ_API && window.TJ_API.click();
            }
            
            super.onInstall()
		} catch (error) { }
    }

    public onGameEnd(){
        console.log('TapjoyChannel.onGameEnd')

        try {
            this.Tapjoy_objectiveComplete()
            this.Tapjoy_showEndCard();
        } catch (error) { }
    }

    // 布尔值。如果为true，则表示可玩单元负责显示结束卡。如果为假，则该播放器不应显示自己的结束卡。例如，此信息可用于驱动游戏和Tapjoy结束卡之间的平滑过渡。
    Tapjoy_showEndCard() {
        try {
            let gameOver = true;
            if (gameOver) {
                // Signal to Tapjoy that the gameplay is finished.
                window.TJ_API && window.TJ_API.gameplayFinished();
               if (window.TJ_API && window.TJ_API.directives.showEndCard) {
                  // render end card
               } else { /* prepare for Tapjoy endcard */ }
            }
        } catch (error) { }
    }
    
    // 在播放器初始化时被调用；如果用户在某些可播放版本上遇到问题，我们将使用此信息进行调试。
    // 您可以使用自己的命名约定，只要保证每个单元以及同一单元的每个版本都有唯一的构建标识符即可。
    Tapjoy_setPlayableBuild() {
        try {
            (window.TJ_API && window.TJ_API.setPlayableBuild(this.buildId));
        } catch (error) { }
    }

    // 功能。跳过可播放内容的其余部分，直至其内部结束卡或任何内部机制标志着可播放体验的结束。提供此功能可以使Tapjoy在我们的插页式广告供应中使用可播放的内容，而“ objectiveComplete ”是由其调用暗示的。
    Tapjoy_skipAd(){
        try {
            (window.TJ_API && window.TJ_API.setPlayableAPI({
                    skipAd: function() { /* go to the end card */ }
            }));
        } catch (error) { }
    }

    // 功能。传达在可播放的生命周期内发生的致命错误，即“致命”错误，它会破坏用户的体验或使广告无法使用。
    // 只有第一个此类信号会产生作用，并且其使用将触发广告体验的结束。
    Tapjoy_error() {
        try {
            (window.TJ_API && window.TJ_API.error("Failed to download important assets"));
        } catch (error) { }
    }

    // 功能。传达用户已回答号召性用语（CTA）并终止可播放单元的消息。因此，它的出现意味着：
    // -游戏目标已经完成，并且
    // -游戏结束
    // 只有此类的第一个信号才会起作用
    Tapjoy_click() {
        try {
            let userAnsweredCTA = true;
            if (userAnsweredCTA)
                window.TJ_API && window.TJ_API.click();
        } catch (error) { }
    }

    // 功能。传达可玩性的主要目的已经完成，但不一定玩法已经完成：用户可以继续与内容互动。
    // 只有此类的第一个信号才会起作用。
    Tapjoy_objectiveComplete() {
        try {
            let userReached1000Points = true;
            if (userReached1000Points) {
                window.TJ_API && window.TJ_API.objectiveComplete();
            }
        } catch (error) { }
    }
}
