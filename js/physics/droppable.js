import { wrapper,  ElementWrapper } from "../engine/element_wrapper.js";

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
        var droppables = wrapper.queryAllByInterface(Droppable);
        // 循环遍历每个元素，修改其 top 属性
        droppables.forEach(function(droppable) {
            // 获取当前元素的 top 属性值，并转换为数字
            var currentTop = parseInt(droppable.element.style.top) || 0;
            // 将 top 属性增加 pixels 像素
            let top = currentTop;
            let speed = 3;
            if(droppable.originalType) {
                speed = droppable.originalType.speed;
            }
            droppable.element.style.top = (currentTop + speed) + 'px';
        });
    }
    
    // 定义一个函数来检查元素的位置并移除超出范围的元素
    removeElements() {
        // 获取所有 id 为 'spirit' 的元素
        let droppables = wrapper.queryAllByInterface(Droppable);
    
        // 遍历每个 spirit 元素
        droppables.forEach(function(droppable) {
            // 获取元素当前的 top 属性值
            let top = parseInt(droppable.element.style.top) || 0;
    
            // 检查 top 属性是否超过了 100vh
            if ((top + droppable.element.clientHeight) > window.innerHeight) {
                // 如果超过了，就从 DOM 中移除该元素
                droppable.element.parentNode.removeChild(droppable.element);
            }
        });
    }
}

wrapper.bind(Droppable);

export const droppable = wrapper.spawnElement(Droppable);