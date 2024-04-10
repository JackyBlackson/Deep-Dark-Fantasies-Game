import { wrapper, ElementWrapper } from "../engine/element_wrapper.js";
import { CollisionTarget } from "../physics/collisions/collision_target.js";
import { Droppable } from "../physics/droppable.js";
import { Player } from "./player.js";
import { CollisionProcessor } from "../physics/collisions/collision.js";

export class Spirit extends ElementWrapper {
    constructor(element) {
        super(element);
        this.speed = 5;
    }

    //Override
    summon() {
        // 创建一个新的 img 元素
        let spirit = document.createElement('img');
        this.element = spirit;

        // 设置 img 元素的 src 属性
        spirit.src = "/assets/images/spirits/enemies/default/kobe.webp";

        // 添加 cssClass 为 spirit
        Droppable.addInterfaceTo(this);
        CollisionTarget.addInterfaceTo(this);
        this.addInterface(spirit);
        this.setType(spirit);

        // 随机生成 1 到 500 之间的一个数作为 left 属性值
        let randomLeft = Math.floor(Math.random() * 450) + 1;

        let borderLeft = (window.innerWidth - 500) / 2

        // 设置 img 元素的 left 属性
        spirit.style.left = randomLeft + borderLeft + 'px';

        // 设置 img 元素的 top 属性为 0
        spirit.style.top = '0';

        // 将 img 元素添加到 id 为 'screen' 的父元素中
        document.getElementById('screen').appendChild(spirit);
    }

    //Override
    collision() {
        return new CollisionProcessor().bind(Player, this.onCollisionWithPlayer);
    }

    onCollisionWithPlayer(origin, target) {
        //console.log("Spirit collapsed with PLAYER!");
        wrapper.despawnElement(origin);
    }
}

wrapper.bind(Spirit);