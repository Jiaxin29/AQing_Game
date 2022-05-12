const {ccclass, property} = cc._decorator;

@ccclass
export abstract class Skill_Base extends cc.Component {

    onLoad () {
	
	}

    start () {

    }

    // 技能展示，必须重写
    abstract showSkill(enemy: cc.Node, aimNode: cc.Node, endFun?: Function)

    // update (dt) {}
}
