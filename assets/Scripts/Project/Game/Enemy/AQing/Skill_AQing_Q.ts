import { DegreesToVectors } from "../../../../Modules/GlobalFunction";
import { Skill_Base } from "../../Skill/Skill_Base";


const {ccclass, property} = cc._decorator;

@ccclass
export default class Skill_AQing_Q extends Skill_Base {
    public collider: cc.PhysicsCollider = null
    
    @property(cc.Prefab)
    public effect: cc.Prefab = null

    onLoad () {
        this.collider = this.node.getComponent(cc.PhysicsCollider)
	}

    start () {
        this.collider.enabled = false
    }

    // 显示技能
    showSkill(enemy: cc.Node, aimNode: cc.Node, endFun?: Function) {
        let temp = [this.node]
        for (let i = 0; i < 5; i++) {
            let item = cc.instantiate(this.node)
            item.parent = this.node.parent
            item.position = this.node.position
            temp.push(item)
        }
        
        let enemyWorldPos = enemy.parent.convertToWorldSpaceAR(enemy.position)
        for (let i = 0; i < temp.length; i++) {
            let node = temp[i]
            node.scaleX = enemy.scaleX
            let dir = DegreesToVectors(i / temp.length * 360)
            dir.mulSelf(400)

            let aimPos = enemyWorldPos.add(cc.v3(dir))
            let localPos = node.parent.convertToNodeSpaceAR(aimPos)
            
            cc.tween(node).to(0.12, {position: localPos}).start()
        }

        // 本体
        let startPos = enemy.position
        this.scheduleOnce(()=>{
            cc.tween(enemy).delay(0.1)
                            .to(0.15, {position: temp[2].position}).call( ()=>{ this.hideItem(temp[2]) } )
                            .to(0.12, {position: temp[4].position}).call( ()=>{ this.hideItem(temp[4]) } )
                            .to(0.15, {position: temp[3].position}).call( ()=>{ this.hideItem(temp[3]) } )
                            .to(0.15, {position: temp[1].position}).call( ()=>{ this.hideItem(temp[1]) } )
                            .to(0.15, {position: temp[5].position}).call( ()=>{ this.hideItem(temp[5]) } )
                            .to(0.12, {position: temp[0].position}).call( ()=>{ this.hideItem(temp[0]) } )
                            .to(0.15, {position: startPos})
                            .delay(0.2)
                            .call(()=>{
                                if (endFun) {
                                    endFun()
                                }
                            })
                            .start()

            this.removeDelayTime(0.1 + 0.15 * 5 + 0.12 * 2 + 0.2, temp)
        }, 0.12)
    }

    hideItem(item: cc.Node) {
        item.getComponent(Skill_AQing_Q).collider.enabled = true
        item.children.forEach( node => {
            node.active = false
        })

        this.scheduleOnce(()=>{
            item.active = false 
        }, 0.05)

        this.showEffect(item)
    }

    showEffect(item: cc.Node) {
        let effect = cc.instantiate(this.effect)
        effect.parent = item.parent
        effect.position = item.position

        cc.tween(effect).delay(1).call(()=>{
            effect.destroy()
        }).start()
    }

    // update (dt) {}
}
