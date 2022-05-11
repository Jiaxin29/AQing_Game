/*
    aoemo.com
*/

import { GetMoneyNum } from "../../Modules/GlobalFunction";
import { GameEventEnum } from "../Data/EventEnum";
import LanguageManager from "../Language/LanguageManager";
import { GameEvent } from "../Main/EventDispatcher";
import GameManager from "../Main/GameManager";
import PGlobalUI from "../Main/PGlobalUI";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PayPalUI extends cc.Component {
	@property(cc.Sprite)
	title: cc.Sprite = null

	@property(cc.Label)
	PPNum: cc.Label = null;

	@property(cc.Node)
	PPCard: cc.Node[] = [];

	@property(cc.ProgressBar)
	PPBar: cc.ProgressBar = null;

	@property(cc.Node)
	public baseNode: cc.Node = null

	@property(cc.Node)
	public logo: cc.Node = null

	public Config_PPNum: number[] = [0, 30, 60, 90]  // 每个进度需要达到的金额

	public PPIndex = 0  // 当前pp阶段
	public ppCoin = 0  // 当前总额
	public updateScore = 0

	// 进度条相关
	private currentProgress: number = 0  // 当前进度
	private aimProgress: number = 0  // 目标进度

	// 金额相关
	public decimal: number = 2
	public symbol: string = '$'

	onLoad() {
		GameEvent.on(GameEventEnum.SET_SHORT_GAME, this.onSetShortGame, this)

		if (!PGlobalUI.Me.payPalUI) {
			PGlobalUI.Me.payPalUI = this
		} else {
			console.log('[PaypalUI] error..有多个paypalui增加了')
		}
	}

	start() {
		if (this.PPBar) {
			this.PPBar.progress = 0;
		}
	}

	update() {
		// 金钱
		if (this.updateScore <= this.ppCoin) {
			let addScore = this.ppCoin - this.updateScore;
			if (addScore > 1000000)
				this.updateScore += 300000;
			if (addScore > 100000)
				this.updateScore += 30000;
			if (addScore > 10000)
				this.updateScore += 3000;
			if (addScore > 10000)
				this.updateScore += 3000;
			if (addScore > 1000)
				this.updateScore += 300;
			else if (addScore > 100)
				this.updateScore += 30;
			else if (addScore > 10)
				this.updateScore += 3;
			else if (addScore > 3)
				this.updateScore += 0.3;
			else
				this.updateScore += 0.1;
			this.updateScore = Math.min(this.updateScore, this.ppCoin);//保证最大只能是score

			let money = GetMoneyNum(this.updateScore, this.decimal)
			if (LanguageManager.ME.currentCountry.reverseMoneyTag || GameManager.ME.isBitCoinGame || GameManager.ME.isDogeCoinGame) {
				this.PPNum.string = money + this.symbol
			} else {
				this.PPNum.string = this.symbol + money
			}
		}

		// 进度条
		if (this.currentProgress <= this.aimProgress) {
			this.currentProgress += 0.01

			if (this.currentProgress >= this.aimProgress) {
				this.currentProgress = this.aimProgress
			}

			if (this.PPBar) {
				this.PPBar.progress = this.currentProgress
			}
		}
	}

	setPPCoin(ppCoin: number) {
		this.ppCoin += ppCoin;
		
		let endCoin = this.Config_PPNum[this.Config_PPNum.length - 1]
		if (this.ppCoin >= endCoin) {
			this.ppCoin = endCoin
		}
	}

	addOneCoin() {
		let endCoin = this.Config_PPNum[this.Config_PPNum.length - 1]
		this.setPPCoin(endCoin / 100)
	}

	addLastCoin() {
		let endCoin = this.Config_PPNum[this.Config_PPNum.length - 1]
		this.setPPCoin(endCoin)
	}
	
	getCurrntPPBtn() {
		if (!this.PPCard || this.PPCard.length == 0) {
			return
		}

		if (GameManager.ME.isShortGame) {
			return this.PPCard[this.PPCard.length - 1]
		} else {
			return this.PPCard[this.PPIndex - 1];
		}
	}

	fillCurrentPPBtn() {
		let PPBtn = this.getCurrntPPBtn();
		if (!PPBtn) {
			return
		}

		PPBtn.getChildByName('ok').active = true;

		let act = cc.sequence(
			cc.scaleTo(0.25, 1.2),
			cc.scaleTo(0.15, 1),
		)
		PPBtn.runAction(act);
	}

	//卡片收集到的闪动动画结束后
	setCardRecAni() {
		this.PPIndex++;
		this.fillCurrentPPBtn();
		GameEvent.emit(GameEventEnum.SHOW_MIDDLE_TIPS)
		if (this.PPIndex >= this.Config_PPNum.length-1) {
			PGlobalUI.Me.finishUI.gameEnd(this.ppCoin);
		}
	}

	// 显示得卡奖励
	public showGetCardUI() {
		let offset = this.Config_PPNum[this.PPIndex + 1] - this.Config_PPNum[this.PPIndex]
		PGlobalUI.Me.getCardUI.Show(offset);
	}

	// 增加金钱
	public addMoney(currLv?: number) {
		if (!currLv) {
			currLv = this.Config_PPNum[this.PPIndex + 1] - this.Config_PPNum[this.PPIndex]
		}

		if (!this.Config_PPNum[this.PPIndex + 1]) {
			return
		}
		
		if (this.PPIndex + 1 >= this.Config_PPNum.length - 1) {
			GameManager.ME.isGameEnd = true
		}
					
		if (GameManager.ME.isShortGame) {
			this.aimProgress = 1
		} else {
			this.aimProgress = (this.PPIndex + 1) / (this.Config_PPNum.length - 1)
			this.aimProgress = Math.min(this.aimProgress, 1)
		}

		// 显示弹卡
		this.setPPCoin(currLv)
		if (GameManager.ME.isSkinGame) {
			this.setCardRecAni()
		} else {
			if (GameManager.ME.isGameEnd) {
				this.setCardRecAni()
			} else {
				this.showGetCardUI()
			}
		}
	}

	private onSetShortGame(_bool: boolean) {
		let list = []
		for (let num of this.Config_PPNum) {
			list.push(num)
		}

		if (_bool) {
			this.Config_PPNum = [0, list[list.length - 1]]
		} else {
			this.Config_PPNum = list
		}

		this.resetShortGameUI()
	}

	// 刷新短游戏UI，只显示最后一个
	private resetShortGameUI() {
		if (!this.PPCard || this.PPCard.length == 0) {
			return
		}

		if (!GameManager.ME.isShortGame) {
			for (let item of this.PPCard) {
				item.active = true	
			}
			return
		}

		for (let item of this.PPCard) {
			item.active = false	
		}
		this.PPCard[this.PPCard.length-1].active = true
	}
}