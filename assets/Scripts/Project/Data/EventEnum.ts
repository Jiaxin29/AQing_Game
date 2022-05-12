/*
    aoemo.com
*/

// 游戏消息枚举
export enum GameEventEnum {
    SET_SHORT_GAME = 'Set_Short_Game',  // 设置长短试玩
    SHOW_MIDDLE_TIPS = 'show_middle_tips',  // 显示中间得奖提示字
    SET_CAN_TOUCH = 'set_can_touch',
    SET_GUIDE_ACTIVE = 'set_guide_active',

    KEY_BOARD_KEY_DOWN = 'key_board_key_down',
    KEY_BOARD_KEY_UP = 'key_board_key_up',

    // 怪物
    SHOW_ENEMY_DATA = 'show_enemy_data',
    ENEMY_USE_SKILL_1 = 'enemy_use_skill_1',  // 使用技能1
    ATTACK_TO_HERO = 'attack_to_hero',  // 怪物普通攻击玩家

    // 玩家
    ATTACK_TO_ENEMY = 'attack_to_enemy',  // 玩家攻击敌人
    ATTACK_TO_ENEMY_SUCCESS = 'attack_to_enemy_success',  // 玩家成功攻击敌人
}

// 皮肤游戏礼包类型
export enum SkinCardType {
    NONE = 0,
    SIX_CARD = 1,
    ROBOLOX = 2,
    FREEFIRE = 3,
    BRAWLSTARS = 4,
    MOBILELEGEND = 5,
}

export enum GroupEnum {
    // 玩家相关
    Hero = 'hero',
    Hero_Bullet = 'hero_bullet',

    // 敌人相关
    Enemy = 'enemy',
    Enemy_Bullet = 'enemy_bullet',

    River = 'river',
}