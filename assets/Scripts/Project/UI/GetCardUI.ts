/*
    aoemo.com
*/

import { GetMoneyNum } from "../../Modules/GlobalFunction";
import { FMgr } from "../../_FutureCore/Manager/FMgr";
import LanguageManager from "../Language/LanguageManager";
import GameManager from "../Main/GameManager";
import PGlobalUI from "../Main/PGlobalUI";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GetCardUI extends cc.Component {
	@property(cc.Node)
	coin: cc.Node = null;

	@property(cc.Label)
	cardnum: cc.Label = null;

	private showRewardList: number[] = []  // 待显示列表
	private isShowing: boolean = false

	isCloseIng = false

	@property(cc.Prefab)
	public pCardParticlePrefab: cc.Prefab = null

	@property(cc.Node)
	public pCardParticleBaseNode: cc.Node = null

	onEnable() {
		this.isCloseIng = false

		this.coin.active = true
		this.coin.scale = 1
		this.coin.setPosition(cc.v2(0, 50))

		let hide = this.node.getChildByName('mainNode').getChildByName('hide')
		// if (hide)
			// hide.active = true
	}

	initStatus() {
		this.scheduleOnce(this.onBtnDark, 0.8)
	}

	onBtnDark() {
		this.unscheduleAllCallbacks()

		cc.log("[GetCardUI]onBtnDark")
		if (this.isCloseIng == false) {
			this.onVideoAward()
		}
	}

	private onVideoAward() {
		this.isCloseIng = true
		this.coin.stopAllActions()

		let hide = this.node.getChildByName('mainNode').getChildByName('hide')
		// if (hide)
			// hide.active = false

		let coin: cc.Node = PGlobalUI.Me.payPalUI.PPNum.node
		let pos = coin.parent.convertToWorldSpaceAR(coin.getPosition())
		let p1 = this.coin.parent.convertToNodeSpaceAR(pos)

		let act = cc.sequence(
			cc.delayTime(0.2),
			cc.scaleTo(0.1, 1.1, 1.1),
			cc.spawn(
				cc.scaleTo(0.4, 0, 0),
				cc.moveTo(0.4, p1),
			),
			cc.callFunc(()=>{
				FMgr.Audio.PlayEffect('award')

				this.coin.active = false
				this.closePage()
			})
		)
		this.coin.runAction(act)
	}

	closePage() {
		this.pCardParticleBaseNode.removeAllChildren()
		this.node.active = false
		PGlobalUI.Me.payPalUI.setCardRecAni()

		this.isShowing = false
		this.tryShow()
	}

	Show(num: number) {
		this.showRewardList.push(num)
		this.tryShow()
	}

	private tryShow(){
		if (this.showRewardList.length <= 0){
			return
		}
		if (this.isShowing){
			return
		}

		let num = this.showRewardList[0]
		this.showRewardList.splice(0, 1)

		this.isShowing = true
		FMgr.Audio.PlayEffect('frame_install')

		this.node.active = true
		let scale = this.node.getChildByName('mainNode').scale
		this.node.getChildByName('mainNode').scale = 0
		cc.tween(this.node.getChildByName('mainNode')).to(0.2, {scale: scale + 0.1}).to(0.1, {scale: scale}).call(()=>{
			let particle = cc.instantiate(this.pCardParticlePrefab)
			particle.parent = this.pCardParticleBaseNode
			particle.getComponent(cc.ParticleSystem).resetSystem()
		}).start()

		let money = GetMoneyNum(num, PGlobalUI.Me.payPalUI.decimal)
		if (LanguageManager.ME.currentCountry.reverseMoneyTag || GameManager.ME.isBitCoinGame || GameManager.ME.isDogeCoinGame) {
			this.cardnum.string = '' + money + PGlobalUI.Me.payPalUI.symbol
		} else {
			this.cardnum.string = '' + PGlobalUI.Me.payPalUI.symbol + money
		}

		this.initStatus()
	}
}