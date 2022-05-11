import { GetMoneyNum } from "../../Modules/GlobalFunction";
import { FMgr } from "../../_FutureCore/Manager/FMgr";
import LanguageManager from "../Language/LanguageManager";
import GameManager from "../Main/GameManager";
import PGlobalUI from "../Main/PGlobalUI";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FinishLabel extends cc.Component {

    private currentMoney: number = 0
	public startMoney: number = 0
    private totalMoney: number = 0
    public symbol: string = '$'
	public decimal: number = 2

    setMoney(money?: number) {
		// this.startMoney = this.totalMoney
        this.totalMoney = money
        this.symbol = PGlobalUI.Me.payPalUI.symbol
		this.decimal = PGlobalUI.Me.payPalUI.decimal

		let count = 80
		let index = 0
		this.schedule(()=>{
            index++
			let n = this.getCurrentMoney(index, count)
			this.currentMoney = n
			this.currentMoney = Math.min(this.currentMoney, this.totalMoney)

			let money = GetMoneyNum(this.currentMoney, this.decimal)
			if (LanguageManager.ME.currentCountry.reverseMoneyTag || GameManager.ME.isBitCoinGame || GameManager.ME.isDogeCoinGame) {
				this.node.getComponent(cc.Label).string = '+' + money + this.symbol
			} else {
				this.node.getComponent(cc.Label).string = '+' + this.symbol + money
			}

            if (index % 5 == 0) {
                FMgr.Audio.PlayEffect('reward_gold_fly_tick', 2)
                FMgr.Audio.PlayEffect('collecGoldSound', 2)
            }

			if (index == count - 10) {
				FMgr.Audio.PlayEffect('win', 1.4)
				FMgr.Audio.PlayEffect('moreWow', 1.4)
			}
		}, 0, count - 1)
		
    }

	getCurrentMoney(x: number, total: number): number {
		let t = this.totalMoney - this.startMoney
		let x1 = x / total

		// return x == total ? this.totalMoney : (1 - Math.pow(2, -10 * x1)) * t
		return x == total ? this.totalMoney : (1 - (1 - x1) * (1 - x1)) * t
	}
}
