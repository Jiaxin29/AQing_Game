const {ccclass, property, executeInEditMode, requireComponent} = cc._decorator;

@ccclass
@executeInEditMode
@requireComponent(cc.RenderComponent)
export default class NewClass extends cc.Component {
    // radius
    @property
    public _radius: number = 1

    @property({tooltip: '模糊度，最低为1。但越大性能会越差'})
    public get radius() {
        return this._radius
    }

    public set radius(v: number) {
        this._radius = v
        if (v <= 1) {
            this._radius = 1
        }

        this._updateGaussian()
    }

    // size
    @property
    public _textureSize: cc.Vec2 = cc.v2(200, 200)

    @property({tooltip: '大小'})
    public get size() {
        return this._textureSize
    }

    public set size(size: cc.Vec2) {
        this._textureSize = size
        this._updateGaussian()
    }

    // onLoad () {
	
	// }

    start () {
        this._updateGaussian()
    }

    private _updateGaussian() {
        this.node.getComponents(cc.RenderComponent).forEach(renderComponent => {
            let material: cc.Material = renderComponent.getMaterial(0)
            material.setProperty('radius', this._radius)
            material.setProperty('size', this._textureSize)
            renderComponent.setMaterial(0, material)
        })
    }
    // update (dt) {}
}
