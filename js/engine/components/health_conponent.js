import {ElementWrapper} from "../wrapper/element_wrapper";

export class HealthComponent extends ElementWrapper {
    constructor(element) {
        super(element);
        this.health = 0;
        this.deadCallBack = null;
    }

    static create(element, health, deadCallBack) {
        let healthComponent = new this();
        healthComponent.health = health;
        healthComponent.deadCallBack = deadCallBack;
        return healthComponent;
    }

    heal(hp) {
        this.health += hp;
    }

    damage(hp) {
        this.health -= hp;
        if(this.health <= 0 && this.deadCallBack) {
            this.deadCallBack(hp, this.health)
        }
    }
    getHealth() {
        return this.health;
    }

    setHealth(hp) {
        this.health = hp;
        if(this.health <= 0 && this.deadCallBack) {
            this.deadCallBack(hp, this.health)
        }
    }
}