import { ElementWrapper, wrapper } from "../engine/element_wrapper.js";
import {playerRole, roleAssets} from "../config/gameplay_config.js";

export class RoleBoard extends ElementWrapper {
    constructor(element) {
        super(element);
        this.childSet = [];
    }

    summon() {
        return document.createElement('div');
    }

    loadItems() {
        for(let i = 0; i < playerRole.length; i++) {
            this.appendChild(RoleBoardItem.makeRoleBoardItem(
                roleAssets[i],
                false
            ));
        }
        this.childSet[0].setActive(true);
    }

    static makeRoleBoard() {
        let board = new this();
        board.loadItems();
        return board;
    }

    activate(index) {
        for(let i = 0; i < playerRole.length; i++) {
            if (i === index) {
                this.childSet[i].setActive(true);
            } else {
                this.childSet[i].setActive(false);
            }
        }
    }

    appendChild(item) {
        this.childSet.push(item);
        this.element.appendChild(item.element);
    }
}

export class RoleBoardItem extends ElementWrapper {
    constructor(element) {
        super(element);
        this.isActive = false;
    }

    summon() {
        return document.createElement('img');
    }

    static makeRoleBoardItem(src, isActive) {
        let item = new this();
        item.element.src = src;
        item.setActive(isActive);
        return item;
    }

    setActive(isActive) {
        this.isActive = isActive;
        if(isActive) {
            this.element.classList.add("ActiveRoleBoardItem");
        } else {
            this.element.classList.remove("ActiveRoleBoardItem");
        }
    }
}

wrapper.bind(RoleBoard);

export const roleBoard = RoleBoard.makeRoleBoard();