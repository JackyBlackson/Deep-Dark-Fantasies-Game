import {BasicEntity} from "./basic_entity.js";
import {wrapper} from "../wrapper/element_wrapper.js";
import {HealthComponent} from "../components/health_conponent.js";

export class BasicSprite extends BasicEntity {
    constructor() {
        super();
        this.healthComponent = HealthComponent.create(this, 10, this.deadCallBack)
    }

    static create(health, deadCallBack) {

    }

    summon() {
        let element = document.createElement('img');
        element.src = "assets/images/entities/default.png";
        return element;
    }

    deadCallBack(damage, health) {
        console.log(`${this.constructor.name}[${this.uuid}] is dead due to damage of ${damage}hp, current hp is ${health}`)
        wrapper.despawnElement(this);
    }

    getHealth() {
        return this.healthComponent.getHealth();
    }

    setHealth(hp) {
        return this.healthComponent.setHealth(hp);
    }

    damage(hp) {
        this.healthComponent.damage(hp);
        this.updateHealthDisplay();
    }

    heal(hp) {
        this.healthComponent.heal(hp);
        this.updateHealthDisplay();
    }

    updateHealthDisplay() {

    }
}