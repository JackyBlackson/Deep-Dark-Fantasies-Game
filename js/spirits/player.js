import { ElementWrapper, wrapper } from "../engine/element_wrapper.js";
import { addKeyboardListener } from "../utilities/event_utilities.js";
import { CollisionProcessor } from "../physics/collisions/collision.js";
import { CollisionOrigin } from "../physics/collisions/collision_origin.js";
import { Spirit } from "./spirit.js";

let borderLeft = (window.innerWidth - 500) / 2;

export class Player extends ElementWrapper {
    constructor(element = null) {
        super(element);
        this.speed = 10;
        this.useMouse = false;
    }

    // Override
    summon() {
        // 创建一个新的 img 元素
        let spirit = document.createElement('img');
        this.element = spirit;
        // 设置 img 元素的 src 属性
        spirit.src = "assets/images/spirits/players/default/default.png";
        // 添加 cssClass 为 spirit
        this.addInterface(spirit);
        this.setType(spirit);
        CollisionOrigin.addInterfaceTo(this);
        let borderLeft = (window.innerWidth - 500) / 2;
        // 设置 img 元素的 left 属性
        spirit.style.left = 250 - 25 + borderLeft + 'px';
        // 设置 img 元素的 top 属性为 距离最底部还有 50px 的位置
        spirit.style.top = (window.innerHeight - 50 - 50) + 'px';
        // 将 img 元素添加到 id 为 'screen' 的父元素中
        document.getElementById('screen').appendChild(spirit);
        return spirit;
    }

    collision() {
        return new CollisionProcessor().bind(Spirit, this.onCollisionWithEnemies);
    }

    onCollisionWithEnemies(origin, target) {
        console.log(`Player collapsed with ${target}!`)
    }

    moveRight() {
        let currentX = parseInt(this.element.style.left) || 0;
        let updateX = Math.min(borderLeft + 500 - 50, currentX + this.speed)
        this.element.style.left = updateX + 'px';
    }

    moveLeft() {
        let currentX = parseInt(this.element.style.left) || 0;
        let updateX = Math.max(borderLeft, currentX - this.speed)
        this.element.style.left = updateX + 'px';
    }

    moveUp() {
        let currentY = parseInt(this.element.style.top) || 0;
        let updateY = Math.max(0, currentY - this.speed)
        this.element.style.top = updateY + 'px';
    }

    moveDown() {
        let currentY = parseInt(this.element.style.top) || 0;
        let updateY = Math.min(window.innerWidth - 50, currentY + this.speed)
        this.element.style.top = updateY + 'px';
    }

    initEventListeners() {
        // 缓存this
        let self = this;

        // 添加键盘按键事件监听器，使用箭头函数确保this指向player对象
        addKeyboardListener("d", () => this.moveRight());
        addKeyboardListener("a", () => this.moveLeft());
        addKeyboardListener("w", () => this.moveUp());
        addKeyboardListener("s", () => this.moveDown());



        // 添加鼠标移动事件监听器，使用箭头函数确保this指向player对象
        document.addEventListener('mousemove', function (event) {
            // 确保 player 的 item 元素存在
            if (self.useMouse) {
                //console.log(`x:${event.clientX}, y:${event.clientY}`)

                // 更新 item 元素的位置为鼠标指针的横纵坐标
                let x = event.clientX
                x = Math.min(x, borderLeft + 500 - 50);
                x = Math.max(x, borderLeft);
                self.element.style.left = x + 'px';

                let y = event.clientY
                self.element.style.top = y + 'px';
            }
        });

        // 添加鼠标点击事件监听器，使用箭头函数确保this指向player对象
        this.element.addEventListener('click', function (event) {
            self.useMouse = !self.useMouse;
            console.log(`click! -> ${self.useMouse}`)
        })
    }
}

wrapper.bind(Player)

export const player = wrapper.spawnElement(Player);
