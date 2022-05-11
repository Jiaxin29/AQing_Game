import { GameEventEnum } from "../../Data/EventEnum";
import { GameEvent } from "../../Main/EventDispatcher";
import HeroController from "./HeroController";

const {ccclass, property} = cc._decorator;

@ccclass
export default class HeroInput extends cc.Component {
    // 输入
    public isInputKeyA: boolean = false
    public isInputKeyD: boolean = false
    public isInputKeyW: boolean = false
    public isInputKeyS: boolean = false

    onLoad () {
        GameEvent.on(GameEventEnum.KEY_BOARD_KEY_DOWN, this.onKeyDown, this)
        GameEvent.on(GameEventEnum.KEY_BOARD_KEY_UP, this.onKeyUp, this)
	}

    start () {

    }

    onKeyDown(keycode: number) {
        switch(keycode) {
            case cc.macro.KEY.a:
                this.isInputKeyA = true
                break
            case cc.macro.KEY.d:
                this.isInputKeyD = true
                break
            case cc.macro.KEY.w:
                this.isInputKeyW = true
                break
            case cc.macro.KEY.s:
                this.isInputKeyS = true
                break
            case cc.macro.KEY.j:
                this.node.getComponent(HeroController).checkAttack()
                break
        }
    }

    onKeyUp(keycode: number) {
        switch(keycode) {
            case cc.macro.KEY.a:
                this.isInputKeyA = false
                break
            case cc.macro.KEY.d:
                this.isInputKeyD = false
                break
            case cc.macro.KEY.w:
                this.isInputKeyW = false
                break
            case cc.macro.KEY.s:
                this.isInputKeyS = false
                break
        }
    }
    // update (dt) {}
}
