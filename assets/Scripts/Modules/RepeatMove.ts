const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    public startX: number = 0
    public startY: number = 0

    @property({tooltip: '勾选时会有返回'})
    public isReturn: boolean = false

    @property
    public time: number = 0

    @property
    public offsetX: number = 0

    @property
    public offsetY: number = 0

    @property
    public delay: number = 0

    onLoad () {
        this.startX = this.node.x
        this.startY = this.node.y
	}

    start () {
        if (this.isReturn) {
            cc.tween(this.node).repeatForever(
                cc.tween().by(this.time, {x: this.offsetX, y: this.offsetY}).by(this.time, {x: -this.offsetX, y: -this.offsetY}).delay(this.delay)
            ).start()
        } else {
            cc.tween(this.node).repeatForever(
                cc.tween().by(this.time, {x: this.offsetX, y: this.offsetY}).call(()=>{
                    this.node.x = this.startX
                    this.node.y = this.startY
                }).delay(this.delay)
            ).start()
        }
    }

    // update (dt) {}
}
