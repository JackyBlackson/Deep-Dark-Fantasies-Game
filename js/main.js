import { wrapper } from "./engine/element_wrapper.js";
import {Player, player} from "./spirits/player.js";
import { Spirit } from "./spirits/spirit.js";
import { Droppable, droppable } from "./physics/droppable.js";
import { Collision, collision } from "./physics/collisions/collision.js";
import { scoreBoard } from "./gui/scoreboard.js";
import { bulletBoard } from "./gui/bullet_board.js";
import { Warebox } from "./spirits/bonuses/warebox.js";


// 定义游戏状态
let gameState = {
    // 在这里定义游戏需要的各种状态和变量
};

// 初始化游戏
function initGame() {
    // 初始化监听器
    initListeners();
}

// 更新游戏状态
function updateGame() {
    // 在这里更新游戏状态，处理用户输入等
    collision.checkCollision();
    droppable.removeElements();
    droppable.moveSpirits();
    scoreBoard.update();
}

// 渲染游戏画面
function renderGame() {
    // 在这里根据游戏状态渲染游戏画面
    let screen = document.getElementById("screen");

    if (screen) {
        let rand = Math.random();
        if (rand < 0.1) {
            wrapper.spawnElement(Spirit);
        }
        if (rand < 0.01) {
            wrapper.spawnElement(Warebox);
        }
    } else {
        alert("NO SCREEN!")
    }
}

// 游戏主循环
function gameLoop() {
    // 更新游戏状态
    updateGame();

    // 渲染游戏画面
    renderGame();

    // 请求下一次动画帧
    //requestAnimationFrame(gameLoop);
}

// 启动游戏
function startGame() {
    initGame(); // 初始化游戏
    gameLoop(); // 启动游戏主循环
    setInterval(() => {
        gameLoop();
    }, 25);
    alert("game, start!")
}

// 开始游戏
startGame();

function initListeners() {
    player.initEventListeners();
}






