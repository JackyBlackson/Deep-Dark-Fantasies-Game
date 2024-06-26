import { wrapper,  ElementWrapper } from "../wrapper/element_wrapper.js";
import {gameSettings, gameTps} from "../../config/gameplay_config.js";

export class Droppable extends ElementWrapper {
    //static name = "Droppable";
    constructor(element) {
        super(element);
        this.speed = 3;
    }

    //Override
    summon() {
    }

    moveSpirits() {
        // 获取所有带有 movable 类的元素
        var droppables = wrapper.queryAll(Droppable);
        // 循环遍历每个元素，修改其 top 属性
        droppables.forEach(function(droppable) {
            if(droppable.element) {// 获取当前元素的 top 属性值，并转换为数字
                var currentTop = parseInt(droppable.element.style.top) || 0;
                // 将 top 属性增加 pixels 像素
                let top = currentTop;
                let speed = 4;  //default
                if (droppable.originalType) {
                    speed = droppable.originalType.speed || 4;
                }
                //droppable.element.style.top = (currentTop + speed / gameTps) + 'px';}
                droppable.originalType.setY(currentTop + speed / gameSettings.system.tps)
            }
        });
    }
    
    // 定义一个函数来检查元素的位置并移除超出范围的元素
    removeElements() {
        // 获取所有 id 为 'spirit' 的元素
        let droppables = wrapper.queryAll(Droppable);
    
        // 遍历每个 spirit 元素
        droppables.forEach(function(droppable) {
            if(droppable.element){// 获取元素当前的 top 属性值
            let top = parseInt(droppable.element.style.top) || 0;
    
            // 检查 top 属性是否超过了 100vh
            if ((top + droppable.element.clientHeight + 15) > window.innerHeight) {
                // 如果超过了，就从 DOM 中移除该元素
                // console.log(droppable)
                // debugger;
                wrapper.despawnElement(droppable);
                //debugger;
            } else if (top < 0) {
                // console.log(droppable)
                // debugger;
                wrapper.despawnElement(droppable);
                //debugger;
            }}
        });
    }
}

wrapper.bind(Droppable);

export const droppable = wrapper.spawnElement(Droppable);