/*
    aoemo.com
*/

import { CoreDispatcher } from "../Dispatcher/CoreDispatcher";
import { CoreMsgBase } from "../Data/CoreMsgBase";
import { GetVisibleViewWidth, GetVisibleViewHeight } from "./../Data/FSystemConst";

const { ccclass } = cc._decorator;

@ccclass
export default class FScreenMgr extends cc.Component {
	/** 是否是竖屏游戏 */
	public isPortraitGame: boolean = true;
	/** 是否是竖屏游戏 */
	public standardResolution: cc.Vec2 = cc.v2(720, 1280);

	/** 画布 */
	public canvas: cc.Canvas = null;
	/** 画布适配 */
	public widget: cc.Widget = null;

	/** 当前是否竖屏 */
	public isCurrPortrait: boolean = true;

	/** 屏幕窗口尺寸 */
	public frameSize: cc.Size = null;
	/** 屏幕窗口尺寸 */
	public canvasSize: cc.Size = null;

	/** 当前宽度尺寸 */
	public curSizeWidth: number = 0;
	/** 当前高度尺寸 */
	public curSizeHeight: number = 0;
	/** 缩放值 */
	public scale: number = 1;

	onLoad() {
		cc.log("[FScreenMgr]Init");

		this.canvas = cc.find("Canvas").getComponent(cc.Canvas);
		this.widget = this.canvas.node.getComponent(cc.Widget);
		cc.view.setOrientation(cc.macro.ORIENTATION_AUTO)

		// 监听屏幕变化
		cc.view.setResizeCallback(() => {
			this.UpdateCanvasSize();
		});
	}

	start() {
		this.checkIsScreenFit()
		this.UpdateCanvasSize();
	}

	private checkIsScreenFit() {
		let ScreenFitNode = cc.find('Canvas/ScreenFit')
		this.isPortraitGame = (ScreenFitNode && ScreenFitNode.active) ? false : true
	}

	private UpdateCanvasSize() {
		this.frameSize = cc.view.getFrameSize();
		if (this.frameSize.width > this.frameSize.height) {
			// 横屏
			this.isCurrPortrait = false;

			this.canvas.fitWidth = false;
			this.canvas.fitHeight = true;

			if (this.isPortraitGame) {
				this.canvas.designResolution = cc.size(this.standardResolution.x, this.standardResolution.y);
				this.curSizeWidth = this.canvas.designResolution.width;
				this.curSizeHeight = Math.floor(this.curSizeWidth * this.frameSize.height / this.frameSize.width);
			}
			else {
				this.canvas.designResolution = cc.size(this.standardResolution.y, this.standardResolution.x);
				this.curSizeHeight = this.canvas.designResolution.height;
				this.curSizeWidth = Math.floor(this.curSizeHeight * this.frameSize.width / this.frameSize.height);
			}
		} else {
			// 竖屏
			this.isCurrPortrait = true;

			this.canvas.fitWidth = true;
			this.canvas.fitHeight = false;

			let frameScale = this.frameSize.width / this.frameSize.height
			if (frameScale > 0.7) {  // ipad 等
				this.canvas.fitWidth = false;
				this.canvas.fitHeight = true;
			}
			
			this.canvas.designResolution = cc.size(this.standardResolution.x, this.standardResolution.y);
			this.curSizeWidth = this.canvas.designResolution.width;
			this.curSizeHeight = Math.floor(this.curSizeWidth * this.frameSize.height / this.frameSize.width);
		}

		this.canvasSize = cc.view.getCanvasSize();
		if (this.standardResolution.x / this.standardResolution.y > this.canvasSize.width / this.canvasSize.height) {
			this.scale = (this.canvasSize.width / this.canvasSize.height) / (this.standardResolution.x / this.standardResolution.y)
		}

		this.widget.updateAlignment();

		// 派发消息
		if (!this.isCurrPortrait) {
			CoreDispatcher.Me.Dispatch(CoreMsgBase.UpdateScreen_Landscape)
		} else {
			CoreDispatcher.Me.Dispatch(CoreMsgBase.UpdateScreen_Protrait)
		}
	}

	public GetVisibleWidth() {
		return GetVisibleViewWidth();
	}

	public GetVisibleHeight() {
		return GetVisibleViewHeight();
	}
}