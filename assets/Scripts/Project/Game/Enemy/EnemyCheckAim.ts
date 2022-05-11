const {ccclass, property, executeInEditMode, requireComponent} = cc._decorator;

@ccclass
@executeInEditMode
export default class EnemyCheckAim extends cc.Component {
    public checkAimCollider: cc.PhysicsCircleCollider = null

    onLoad () {
        
	}

    start () {

    }

    // update (dt) {}
}
