import { FMgr } from "../../_FutureCore/Manager/FMgr";
import { GameEventEnum } from "../Data/EventEnum";
import { GameEvent } from "../Main/EventDispatcher";
import GameManager from "./GameManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    private step: number = 0

    onLoad () {
        GameEvent.on(GameEventEnum.SHOW_MIDDLE_TIPS, this.onShowMiddleTips, this)
    }

    start () {

    }

    onShowMiddleTips() {
        this.step++
        let data = this.getNameByStep()
        let name = data.name
        let volume = data.volume
        
        FMgr.Audio.PlayEffect(name, volume)

        // 调整名字
        if (name == 'excellent') {
            name = 'excellence'
        }

        let sprite = this.node.getChildByName('sprite')
        sprite.active = true
        let spine = sprite.getComponent(sp.Skeleton)
        let track = spine.setAnimation(0, name, false)
        if (track) {
            spine.setCompleteListener(()=>{
                spine.clearTracks()
                sprite.active = false
            })
        }
    }

    getNameByStep(): {name, volume} {
        let Effect = {
			Good: 'good',
			Amazing: 'amazing',
			Excellent: 'excellent',
		}

        let name = Effect.Excellent
        let volume = 0.6
		if (!GameManager.ME.isShortGame) {
			switch(this.step) {
				case 1:
					name = Effect.Good
					volume = 1.5
					break
				case 2:
					name = Effect.Amazing
					break
				case 3:
					name = Effect.Excellent
					break
			}
		}

        return {name: name, volume: volume}
    }
    // update (dt) {}
}
