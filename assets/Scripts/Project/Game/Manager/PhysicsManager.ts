import { CoreMsgBase } from "../../../_FutureCore/Data/CoreMsgBase";
import { CoreDispatcher } from "../../../_FutureCore/Dispatcher/CoreDispatcher";

const {ccclass, property, executeInEditMode} = cc._decorator;

@ccclass
@executeInEditMode
export default class PhysicsManager extends cc.Component {
    @property(cc.Node)
    public canvas: cc.Node = null

    @property
    public debug: boolean = false

    onLoad () {
        let manager = cc.director.getPhysicsManager()
        manager.enabled = true
        manager.debugDrawFlags = this.debug ? 1 : 0
        manager.gravity = cc.v2(0, 0)

        CoreDispatcher.Me.AddListener(CoreMsgBase.UpdateScreen_Landscape, this.fixPhysics, this)
        CoreDispatcher.Me.AddListener(CoreMsgBase.UpdateScreen_Protrait, this.fixPhysics, this)
	}

    start () {

    }

    fixPhysics() {
        this.updatePhysics(this.canvas)
    }

    // 更新物理坐标缩放等(只针对Game节点下)
    updatePhysics(currentNode: cc.Node) {
        if (!cc.director.getPhysicsManager() || !cc.director.getPhysicsManager().enabled) {
            return
        }
        
        let _rb2d = currentNode.getComponent(cc.RigidBody)
        let _collider = currentNode.getComponent(cc.PhysicsCollider)
        if (_rb2d && _collider) {
            _rb2d.syncPosition(true)
            _rb2d.syncRotation(true)
            _collider.apply()
        }

        // 子节点
        for (let child of currentNode.children) {
            this.updatePhysics(child)
        }
    }
    // update (dt) {}
}
