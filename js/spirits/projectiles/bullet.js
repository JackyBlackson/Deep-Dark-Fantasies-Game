import { ElementWrapper, wrapper } from "../../engine/element_wrapper.js";
import { Droppable } from "../../physics/droppable.js";
import { CollisionOrigin } from "../../physics/collisions/collision_origin.js";
import { CollisionProcessor } from "../../physics/collisions/collision.js";
import { setPosition, mountElement } from "../../utilities/common_utilities.js";
import { Spirit } from "../spirit.js";
import { scoreBoard } from "../../gui/scoreboard.js";

export class Bullet extends ElementWrapper {
    constructor(element) {
        // debugger;
        super(element);
        this.speed = -8;
    }

    //Override
    summon() {
        var element = document.createElement('div');
        this.element = element;
        Bullet.setTypeTo(this);
        Bullet.addInterfaceTo(this);
        Droppable.addInterfaceTo(this);
        CollisionOrigin.addInterfaceTo(this);
        mountElement(this.element);
        return element;
    }

    //Override
    collision() {
        return new CollisionProcessor()
            .bind(Spirit, this.onCollisionWithSpirit);
    }

    onCollisionWithSpirit(origin, target) {
        wrapper.despawnElement(target);
        wrapper.despawnElement(origin);
        scoreBoard.add(15);
    }
}

wrapper.bind(Bullet);