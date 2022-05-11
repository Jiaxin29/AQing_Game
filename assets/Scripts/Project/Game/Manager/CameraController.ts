const {ccclass, property} = cc._decorator;

let CameraWorldPos: cc.Vec3 = null  // 相机世界坐标
let HeroWorldPos: cc.Vec3 = null  // 玩家世界坐标
let OffsetLen: number = 200  // 超出值跟踪
let AimPosition: cc.Vec3 = null

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Node)
    public hero: cc.Node = null

    onLoad () {
        
	}

    start () {

    }

    // update (dt) {}

    lateUpdate(dt: number) {
        CameraWorldPos = this.node.parent.convertToWorldSpaceAR(this.node.position)
        HeroWorldPos = this.hero.parent.convertToWorldSpaceAR(this.hero.position)
        let dir = HeroWorldPos.sub(CameraWorldPos)
        let len = dir.len()
        if (len >= OffsetLen) {
            AimPosition = this.node.position.add(dir.normalize().mul(Math.abs(len - OffsetLen)))
            this.node.position = this.node.position.lerp(AimPosition, 0.12)
        }
    }
}
