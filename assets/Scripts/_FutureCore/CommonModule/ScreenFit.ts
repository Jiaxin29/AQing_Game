import { CoreMsgBase } from "../../_FutureCore/Data/CoreMsgBase";
import { CoreDispatcher } from "../Dispatcher/CoreDispatcher";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Node)
    public ProtraitBaseNode: cc.Node = null

    @property(cc.Node)
    public LandscapeBaseNode: cc.Node = null

    @property(cc.Node)
    public Game: cc.Node = null

    @property(cc.Node)
    public UI: cc.Node = null

    @property(cc.Node)
    public ReviewUI: cc.Node = null

    @property(cc.Node)
    public background: cc.Node = null

    onLoad() {
        CoreDispatcher.Me.AddListener(CoreMsgBase.UpdateScreen_Landscape, this.landscape, this)
        CoreDispatcher.Me.AddListener(CoreMsgBase.UpdateScreen_Protrait, this.protrait, this)
    }

    // 横屏
    landscape() {
        if (!this.LandscapeBaseNode) {
            return
        }

        this.updateBackground(false)
        this.updateGame(this.LandscapeBaseNode)
        this.updateUI(this.UI, this.LandscapeBaseNode)
        this.updateUI(this.ReviewUI, this.LandscapeBaseNode)
    }

    // 竖屏
    protrait() {
        if (!this.ProtraitBaseNode) {
            return
        }

        this.updateBackground(true)
        this.updateGame(this.ProtraitBaseNode)
        this.updateUI(this.UI, this.ProtraitBaseNode)
        this.updateUI(this.ReviewUI, this.ProtraitBaseNode)
    }

    // 获得node路径(不包括canvas)
    private getNodePath(node: cc.Node): string{
        let path = ''
        let currentNode = node
        while(true) {
            let name = currentNode.name
            if (name == 'Canvas') {
                break
            } else {
                path = '/' + name + path
            }

            currentNode = currentNode.parent
        }

        return path
    }

    private updateBackground(isProtrait) {
        if (!this.background) {
            return
        }

        let angle = isProtrait ? 0 : 90
        this.background.angle = angle
    }

    // 更新游戏
    private updateGame(screenBaseNode: cc.Node) {
        if (this.Game.getComponent(cc.Widget) && screenBaseNode.getChildByName('Game').getComponent(cc.Widget)) {
            this.Game.getComponent(cc.Widget).isAlignTop = screenBaseNode.getChildByName('Game').getComponent(cc.Widget).isAlignTop
            this.Game.getComponent(cc.Widget).isAlignLeft = screenBaseNode.getChildByName('Game').getComponent(cc.Widget).isAlignLeft
            this.Game.getComponent(cc.Widget).isAlignRight = screenBaseNode.getChildByName('Game').getComponent(cc.Widget).isAlignRight
            this.Game.getComponent(cc.Widget).isAlignBottom = screenBaseNode.getChildByName('Game').getComponent(cc.Widget).isAlignBottom

            this.Game.getComponent(cc.Widget).top = screenBaseNode.getChildByName('Game').getComponent(cc.Widget).top
            this.Game.getComponent(cc.Widget).left = screenBaseNode.getChildByName('Game').getComponent(cc.Widget).left
            this.Game.getComponent(cc.Widget).right = screenBaseNode.getChildByName('Game').getComponent(cc.Widget).right
            this.Game.getComponent(cc.Widget).bottom = screenBaseNode.getChildByName('Game').getComponent(cc.Widget).bottom
        }

        this.Game.position = screenBaseNode.getChildByName('Game').position
        this.Game.scale = screenBaseNode.getChildByName('Game').scale
    }

    // 更新UI
    private updateUI(currentNode: cc.Node, screenBaseNode: cc.Node) {
        // 当前点
        let path = this.getNodePath(currentNode)
        let aimPath = 'Canvas/ScreenFit/' + screenBaseNode.name + path
        // console.log('path = ', path, '\naimPath', aimPath)
        let aimNode = cc.find(aimPath)
        if (!aimNode) {
            return
        }

        currentNode.position = aimNode.position
        currentNode.width = aimNode.width
        currentNode.height = aimNode.height
        currentNode.scaleX = aimNode.scaleX
        currentNode.scaleY = aimNode.scaleY

        // 进度条特殊处理
        /*
            因为会重新设置宽高，所以需要重新设置进度
            当前是进度条的进度，控制进度必须是父节点
        */
        if (currentNode.parent.getComponent(cc.ProgressBar)) {
            let progress = currentNode.parent.getComponent(cc.ProgressBar).progress
            currentNode.width = currentNode.width * progress
        }

        // 文字特殊处理
        /*
            因为文字类型是SHRINK，与width挂钩，所以只要改动width即可
        */
        if (currentNode.getComponent(cc.Label) && aimNode.getComponent(cc.Label)) {
            currentNode.getComponent(cc.Label).node.width = aimNode.getComponent(cc.Label).node.width
            currentNode.getComponent(cc.Label).fontSize = aimNode.getComponent(cc.Label).fontSize
        }

        // widget特殊处理
        if (currentNode.getComponent(cc.Widget) && aimNode.getComponent(cc.Widget)) {
            currentNode.getComponent(cc.Widget).isAlignTop = aimNode.getComponent(cc.Widget).isAlignTop
            currentNode.getComponent(cc.Widget).isAlignLeft = aimNode.getComponent(cc.Widget).isAlignLeft
            currentNode.getComponent(cc.Widget).isAlignRight = aimNode.getComponent(cc.Widget).isAlignRight
            currentNode.getComponent(cc.Widget).isAlignBottom = aimNode.getComponent(cc.Widget).isAlignBottom
            
            currentNode.getComponent(cc.Widget).top = aimNode.getComponent(cc.Widget).top
            currentNode.getComponent(cc.Widget).left = aimNode.getComponent(cc.Widget).left
            currentNode.getComponent(cc.Widget).right = aimNode.getComponent(cc.Widget).right
            currentNode.getComponent(cc.Widget).bottom = aimNode.getComponent(cc.Widget).bottom
        }

        // 子节点
        for (let child of currentNode.children) {
            this.updateUI(child, screenBaseNode)
        }
    }
    
    // update (dt) {}
}
