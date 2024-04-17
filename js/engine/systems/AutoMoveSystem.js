import {wrapper} from "../wrapper/element_wrapper.js";
import {AutoMoveComponent} from "../components/automove_component.js";
import {getMargin} from "../../utilities/common_utilities.js";
import {gameSettings} from "../../config/gameplay_config.js";

export class AutoMoveSystem {
    constructor() {

    }

    static update() {
        let autoMoveElements = wrapper.queryAll(AutoMoveComponent);
        let marginLeft = getMargin();
        // 遍历每个 spirit 元素
        autoMoveElements.forEach(function(autoMove) {
            if(autoMove.element){// 获取元素当前的 top 属性值
                let top = parseInt(autoMove.element.style.top) || 0;
                let left = parseInt(autoMove.element.style.left) || 0;
                // 检查 top 属性是否超过了 100vh
                if ((top + autoMove.element.clientHeight + 10) > window.innerHeight) {
                    // 如果超过了，就从 DOM 中移除该元素
                    // console.log(droppable)
                    // debugger;
                    wrapper.despawnElement(autoMove);
                    //debugger;
                } else if (top < 0) {
                    // console.log(droppable)
                    // debugger;
                    wrapper.despawnElement(autoMove);
                    //debugger;
                } else if (left <= marginLeft || left + autoMove.element.clientWidth >= marginLeft + 500) {
                    wrapper.despawnElement(autoMove);
                } else {
                    //move element
                    autoMove.originalType.setX(autoMove.originalType.getX() + autoMove.speedX / gameSettings.system.tps)
                    autoMove.originalType.setY(autoMove.originalType.getY() + autoMove.speedY / gameSettings.system.tps)
                }
            }
        });
    }
}