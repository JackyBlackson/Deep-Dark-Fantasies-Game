import {ElementWrapper, wrapper} from "../wrapper/element_wrapper.js";
import {getMargin} from "../../utilities/common_utilities.js";

export class BasicEntity extends ElementWrapper {
    //Override
    constructor(element) {
        super(element);
        this.x = 0;
        this.y = 0;
        this.addCssClass(this.constructor.name);
    }

    static createAt(x, y) {
        let entity = new this();
    }

    //Override
    summon() {
        let element = document.createElement('img');
        element.src = "assets/images/entities/default.png";
        return element;
    }

    //Override
    load() {

    }

    setX(x) {
        this.x = x;
        this.originalType.element.style.left = getMargin() + x + "px";
    }

    setY(y) {
        this.y = y;
        this.originalType.element.style.top = y + "px";
    }

    getX() {
        let margin = getMargin();
        let x = (parseInt(this.originalType.element.style.left) || margin) - margin
        this.x = x;
        return x;
    }

    getY() {
        let y = parseInt(this.originalType.element.style.top || 0);
        this.y = y;
        return y;
    }

    moveX(pixel) {
        this.setX(this.x + pixel);
    }

    moveY(pixel) {
        this.setX(this.y + pixel);
    }

    setPosition(x, y) {
        this.setX(x);
        this.setY(y);
    }


    getPosition() {
        return {
            x: this.getX(),
            y:this.getY(),
        }
    }
}