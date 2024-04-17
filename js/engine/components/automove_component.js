import {ElementWrapper, wrapper} from "../wrapper/element_wrapper.js";

export class AutoMoveComponent extends ElementWrapper {
    constructor(element) {
        super(element);
        this.speedX = 0;
        this.speedY = 0;
    }
    setSpeedX(speed) {
        this.speedX = speed;
        return this;
    }

    setSpeedY(speed) {
        this.speedY = speed;
        return this;
    }
}

wrapper.bind(AutoMoveComponent);