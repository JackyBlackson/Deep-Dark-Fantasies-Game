# 地狱英雄小游戏设计

## 角色

玩家扮演一个飞机角色，这个角色有不同的形态，每个形态有自己的武器，消耗特定的弹药。

角色如果撞上地图上的障碍物会被造成伤害，血量低于0会导致切换至科比皮肤并坠机并播放《See You Again》，游戏结束。

形态和技能：

* 山上彻也：消耗 1 能量，击中安倍两次可以消除安倍；对其他敌人无效；

* 刺客：消耗 1 能量，一击必杀肯尼迪/林肯，对其他角色需要 3 子弹；

* 飞机： 消耗 3 能量，对普里戈津一击必杀，对障碍物世贸大楼一击必杀，对其他角色无效。

* B29：消耗 10 能量，发射核弹，清除屏幕内的所有障碍物（包括山脉）

玩家有两个基本属性：血量与弹药量。其中血量根据难度变化，碰撞到一个障碍物会扣除1点血；

弹药量会在发射时消耗，捡起地图上生成的弹药箱可以补充弹药。

## 地图

根据噪声函数生成障碍物，包括：

* 山脉……：不可摧毁障碍物，只能绕行；

* 世贸大楼/其他建筑物：可以通过飞机形态发射子弹摧毁；

根据噪声生成敌人，包括：

* 安倍；

* 肯尼迪；

* 普里戈津；

* 林肯；

## 游戏过程

* 通过 wasd 或者鼠标改变飞机位置

* 通过 space 或者鼠标鼠标左键发射子弹

* 通过 shift 切换角色形态（转轮模式）

* 通过 r 重开

* 通过 esc 暂停

玩家血量小于 0 则游戏结束，摧毁敌人或者障碍物可以得分，记录游戏分数；

地图平移速度随着时间增多，障碍物也会增多；