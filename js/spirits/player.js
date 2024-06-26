import { ElementWrapper, wrapper } from "../engine/wrapper/element_wrapper.js";
import { addKeyboardListener } from "../utilities/event_utilities.js";
import { CollisionProcessor } from "../engine/physics/collisions/collision.js";
import { CollisionOrigin } from "../engine/physics/collisions/collision_origin.js";
import { Spirit } from "./spirit.js";
import { scoreBoard } from "../gui/scoreboard.js";
import { Bullet } from "./projectiles/bullet.js";
import { bulletBoard } from "../gui/bullet_board.js";
import {gameSettings, playerRole, roleAssets} from "../config/gameplay_config.js";
import {roleBoard} from "../gui/role_board.js";
import {BasicEntity} from "../engine/entity/basic_entity.js";
import {TerrainTile} from "../entities/terrain_tile.js";


let borderLeft = (window.innerWidth - 500) / 2;



export class Player extends BasicEntity {
    constructor(element = null) {
        super(element);
        this.speed = 10;
        this.useMouse = false;
        this.role = playerRole[0];
        this.roleIndex = 0;
        this.setRole(0);
        this.collisionProcessor = new CollisionProcessor()
            .bind(Spirit, this.onCollisionWithEnemies)
        ;
    }

    // Override
    summon() {
        // 创建一个新的 img 元素
        let spirit = document.createElement('img');
        this.element = spirit;
        // 设置 img 元素的 src 属性
        spirit.src = "assets/images/spirits/players/default/default.png";
        // 添加 cssClass 为 spirit
        CollisionOrigin.addInterfaceTo(this);
        let borderLeft = (window.innerWidth - 500) / 2;
        // 设置 img 元素的 left 属性
        spirit.style.left = 250 - 25 + borderLeft + 'px';
        // 设置 img 元素的 top 属性为 距离最底部还有 50px 的位置
        spirit.style.top = (window.innerHeight - 50 - 50) + 'px';
        return spirit;
    }

    changeRole(right) {
        if (right){
            if (this.roleIndex === playerRole.length - 1) {
                this.setRole(0);
            } else {
                this.setRole(this.roleIndex + 1);
            }
        } else {
            if (this.roleIndex === 0) {
                this.setRole(playerRole.length - 1);
            } else {
                this.setRole(this.roleIndex - 1);
            }
        }
    }

    setRole(roleIndex) {
        this.roleIndex = roleIndex;
        this.role = playerRole[roleIndex];
        this.element.src = roleAssets[roleIndex];
        //TODO: MAKE THE ROLE BOARD CHANGE TOO
        roleBoard.activate(roleIndex);
    }

    collision() {
        return this.collisionProcessor;
    }

    onCollisionWithEnemies(origin, target) {
        scoreBoard.add(-30);
    }

    throwProjectile() {
        const { x, y } = this.getPosition();
        let projectile = null;
        let speedx = gameSettings.entities.bullet.speedX;
        let speedy = gameSettings.entities.bullet.speedY;
        if(this.roleIndex === 0 && bulletBoard.count >= 1) {
            Bullet.create(x + 15, y, 0, -speedy);
            bulletBoard.minus(1);
        } else if (this.roleIndex === 1 && bulletBoard.count >= 5) {
            Bullet.create(x + 15, y, -1 * speedx, -speedy);
            Bullet.create(x + 15, y, 0, -speedy);
            Bullet.create(x + 15, y, speedx, -speedy);
            bulletBoard.minus(4);
        } else {
            console.log("summon projectiles")
        }
        return projectile
    }

    initEventListeners() {
        // 缓存this
        let self = this;

        // 添加键盘按键事件监听器，使用箭头函数确保this指向player对象
        addKeyboardListener(" ", () => this.throwProjectile());

        addKeyboardListener("s", () => this.throwProjectile());
        addKeyboardListener("d", () => this.throwProjectile());
        addKeyboardListener("a", () => this.changeRole(false));
        addKeyboardListener("f", () => this.changeRole(true));

        addKeyboardListener("q", () => this.setRole(0));
        addKeyboardListener("w", () => this.setRole(1));
        addKeyboardListener("e", () => this.setRole(2));
        addKeyboardListener("r", () => this.setRole(3));


        // 添加事件监听器
        document.addEventListener('contextmenu', () => {
            // 阻止默认的右键菜单
            event.preventDefault();
            this.throwProjectile();
        });



        // 添加鼠标移动事件监听器，使用箭头函数确保this指向player对象
        document.addEventListener('mousemove', function (event) {
            // 确保 player 的 item 元素存在
            if (self.useMouse) {
                //console.log(`x:${event.clientX}, y:${event.clientY}`)

                // 更新 item 元素的位置为鼠标指针的横纵坐标
                let x = event.clientX - 25
                x = Math.min(x, borderLeft + 500 - 50);
                x = Math.max(x, borderLeft);
                self.element.style.left = x + 'px';

                let y = event.clientY - 25
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

