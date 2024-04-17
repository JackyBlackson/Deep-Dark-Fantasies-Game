import { ElementWrapper, wrapper } from "../../engine/wrapper/element_wrapper.js";
import { CollisionTarget } from "../../engine/physics/collisions/collision_target.js";
import { CollisionProcessor } from "../../engine/physics/collisions/collision.js";
import { Droppable } from "../../engine/physics/droppable.js";
import {tileDefaultSpeed, wareboxSpeed} from "../../config/gameplay_config.js";
import { Player } from "../player.js";
import { Bullet } from "../projectiles/bullet.js";
import { bulletBoard } from "../../gui/bullet_board.js";
import { wareboxBulletCount } from "../../config/gameplay_config.js";
import {BasicEntity} from "../../engine/entity/basic_entity.js";

export class Warebox extends BasicEntity {
    constructor(element) {
        super(element);
        this.speed = wareboxSpeed;
    }

    summon() {
        // 创建一个新的 img 元素
        let spirit = document.createElement('img');
        this.element = spirit;

        // 设置 img 元素的 src 属性
        spirit.src = "assets/images/spirits/bonuses/wareboxes/warebox.webp";

        // 添加 cssClass 为 spirit
        Droppable.addInterfaceTo(this);
        CollisionTarget.addInterfaceTo(this);

        // 随机生成 1 到 500 之间的一个数作为 left 属性值
        let randomLeft = Math.floor(Math.random() * 450) + 1;

        let borderLeft = (window.innerWidth - 500) / 2

        // 设置 img 元素的 left 属性
        spirit.style.left = randomLeft + borderLeft + 'px';

        // 设置 img 元素的 top 属性为 0
        spirit.style.top = '0';
        return spirit;
    }

    //Override
    collision() {
        return new CollisionProcessor()
            .bind(Player, this.onCollisionWithPlayer)
            .bind(Bullet, this.onCollisionWithProjectile);
    }

    onCollisionWithPlayer(origin, target) {
        wrapper.despawnElement(origin);
        bulletBoard.add(wareboxBulletCount);
    }

    onCollisionWithProjectile(origin, target) {
        wrapper.despawnElement(origin);
        wrapper.despawnElement(target);
        bulletBoard.add(wareboxBulletCount);
    }
}

wrapper.bind(Warebox);