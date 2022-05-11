// 得到金额，若超过万，则每3位数增加逗号，并且取整
export function GetMoneyNum(money: number, decimal: number = 2, isShowK: boolean = false): string {
    if (money / 10000 < 1) {
        return money.toFixed(decimal)
    }

    let str = ''
    let temp = Math.floor(money)
    let count = 0

    while (true) {
        let num = temp % 10
        count++
        str = num + str
        temp = Math.floor(temp / 10)
        if (temp <= 0) {
            break
        }

        if (count >= 3) {
            count = 0
            str = ',' + str
        }
    }

    return str
}

// 向量求角度，基于y轴
export function VectorsToDegrees(dirVec: cc.Vec2): number {
    if (dirVec.len() == 0) {
        return 0
    }
    
    let comVec = cc.v2(0, 1)    // 水平向上的对比向量
    let radian = dirVec.signAngle(comVec)    // 求方向向量与对比向量间的弧度
    let degree = cc.misc.radiansToDegrees(-radian)    // 将弧度转换为角度。这里需要需要取反，因为逆时针是正数

    return degree
}

// 角度求向量，基于y轴
export function DegreesToVectors(degree: number): cc.Vec2 {
    let comVec = cc.v2(0, 1)    // 一个水平向上的对比向量
    let radian = cc.misc.degreesToRadians(degree)  // 转为弧度
    let dirVec = comVec.rotate(radian)    // 将对比向量旋转给定的弧度返回一个新的向量。这里不需要取反，因为rotate是根据ccc逆时针旋转来的
    
    return dirVec
}
