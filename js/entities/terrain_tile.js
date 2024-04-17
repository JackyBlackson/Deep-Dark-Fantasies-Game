//import {ElementWrapper} from "../engine/wrapper/element_wrapper.js";
import {AutoMoveComponent} from "../engine/components/automove_component.js";
import {CollisionTarget} from "../engine/physics/collisions/collision_target.js";
import {CollisionProcessor} from "../engine/physics/collisions/collision.js";
import {BasicEntity} from "../engine/entity/basic_entity.js";
import {Droppable} from "../engine/physics/droppable.js";
import {Player} from "../spirits/player.js";
import {wrapper} from "../engine/wrapper/element_wrapper.js";
import {scoreBoard} from "../gui/scoreboard.js";

export class TerrainTile extends BasicEntity {
    constructor(element) {
        super(element);
        //this.autoMoveComponent = AutoMoveComponent.addInterfaceTo(this).setSpeedX(0).setSpeedY(0);
        Droppable.addInterfaceTo(this);
        this.speed = 200;
        this.collisionTarget = CollisionTarget.addInterfaceTo(this);
        this.collisionProcessor = new CollisionProcessor()
            .bind(Player, this.onCollisionWithPlayer);
    }

    static create(x, y, speedY) {
        let tile = new TerrainTile();
        tile.setPosition(x, y);
        tile.speed = speedY;
        // tile.autoMoveComponent.setSpeedX(0);
        // tile.autoMoveComponent.setSpeedY(speedY);
        return tile;
    }

    summon() {
        let element=  document.createElement("img")
        element.src = "assets/images/entities/terrains/stone.jpg"
        return element;
    }

    collision() {
        return this.collisionProcessor;
    }

    onCollisionWithPlayer(self, that) {
        scoreBoard.add(-15)
        wrapper.despawnElement(self);
    }
}