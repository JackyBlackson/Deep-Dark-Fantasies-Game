import { ElementWrapper, wrapper } from "../../engine/wrapper/element_wrapper.js";
import { Droppable } from "../../engine/physics/droppable.js";
import { CollisionOrigin } from "../../engine/physics/collisions/collision_origin.js";
import { CollisionProcessor } from "../../engine/physics/collisions/collision.js";
import { setPosition, mountElement } from "../../utilities/common_utilities.js";
import { Spirit } from "../spirit.js";
import { scoreBoard } from "../../gui/scoreboard.js";
import {bulletSpeed} from "../../config/gameplay_config.js";
import {BasicEntity} from "../../engine/entity/basic_entity.js";
import {AutoMoveComponent} from "../../engine/components/automove_component.js";

export class Bullet extends BasicEntity {
    constructor(element) {
        // debugger;
        super(element);
        this.speed = -bulletSpeed;
        this.autoMoveComponent = AutoMoveComponent.addInterfaceTo(this).setSpeedY(-bulletSpeed);
        this.collisionOriginComponent = CollisionOrigin.addInterfaceTo(this);
    }

    static create(x, y, speedX, speedY) {
        let bullet = new Bullet();
        bullet.setPosition(x, y);
        bullet.autoMoveComponent.setSpeedX(speedX);
        bullet.autoMoveComponent.setSpeedY(speedY);
        return bullet;
    }

    //Override
    summon() {
        let element = document.createElement('div');
        this.element = element;
        //Droppable.addInterfaceTo(this);
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