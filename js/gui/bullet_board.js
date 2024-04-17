import { ElementWrapper, wrapper } from "../engine/wrapper/element_wrapper.js";

class BulletBoard extends ElementWrapper {
    constructor(element) {
        super(element);
        this.count = 50;
        this.update();
    }

    //Override
    summon() {
        let text = document.createElement('div');
        this.element = text;
        text.innerText = String(0);
        //BulletBoard.addInterfaceTo(this);
        //mountElement(this.element);
        return text;
    }

    set(count) {
        this.count = count;
        this.update();
    }

    add(count) {
        this.count += count;
        this.update();
    }

    minus(count) {
        this.count -= count;
        this.update();
    }

    update() {
        this.element.innerText = this.count;
    }
}

wrapper.bind(BulletBoard);
export const bulletBoard = new BulletBoard();