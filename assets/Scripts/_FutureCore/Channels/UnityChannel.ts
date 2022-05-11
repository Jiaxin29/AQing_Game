import { GameEventEnum } from "../../Project/Data/EventEnum";
import { GameEvent } from "../../Project/Main/EventDispatcher";
import BaseChannel from "./BaseChannel";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UnityChannel extends BaseChannel {
    public onGameReady() {
        console.log('UnityChannel.onGameReady')
        try{
            if (!mraid) {
                return
            }
    
            if (mraid.getState() === 'loading') {
                mraid.addEventListener('ready', ()=>{
                    this.onSdkReady()
                })
            } else {
                this.onSdkReady()
            }
        } catch (error) { 

        }
    }

    onSdkReady() {
        try{
            mraid.addEventListener('viewableChange', (viewable)=>{
                if (viewable) {
                    GameEvent.emit(GameEventEnum.SHOW_PLAYABLE)
                }
            })

            if (mraid.isViewable()) {
                GameEvent.emit(GameEventEnum.SHOW_PLAYABLE)
            }
        } catch (error) { 
            
        }
    }
}
