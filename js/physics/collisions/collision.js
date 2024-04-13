import { wrapper, ElementWrapper } from "../../engine/element_wrapper.js";
import { CollisionOrigin } from "./collision_origin.js";
import { CollisionTarget } from "./collision_target.js";
import { hasMethod } from "../../utilities/common_utilities.js";

export class Collision extends ElementWrapper {
    constructor(element) {
        super(element);
    }

    summon() {
    }

    checkCollision() {
        let originList = wrapper.queryAll(CollisionOrigin);
        let targetList = wrapper.queryAll(CollisionTarget);
        // console.log(originList);
        // console.log(targetList);

        originList.forEach(origElement => {
            if (origElement.element)
                targetList.forEach(targElement => {
                    if (
                        targElement.element &&
                        checkOverlap(origElement, targElement
                        )) {
                        // console.log(origElement);
                        // console.log(targElement);
                        origElement.originalType.collision().with(origElement, targElement);
                        targElement.originalType.collision().with(targElement, origElement);
                    }
                });
        });
    }
}

wrapper.bind(Collision);
export const collision = wrapper.spawnElement(Collision);

export class CollisionProcessor {
    constructor() {
        this.callbackMap = new Map;
    }

    bind(className, callback) {
        this.callbackMap.set(className, callback);
        return this;
    }

    with(origin, target) {
        const className = wrapper.classMap.get(target.originalType.constructor.name);
        //console.log(className);
        //console.log(origin);
        if (this.callbackMap.has(className)) {
            const callback = this.callbackMap.get(className);
            callback(origin, target);
        }
    }
}



//碰撞检测函数：如果碰撞，返回true。使用矩形框来判定
export function checkOverlap(element1, element2) {
    // console.log(element1);
    // console.log(element2);
    // debugger;
    // 获取元素1的位置和尺寸
    const rect1 = element1.element.getBoundingClientRect();

    // 获取元素2的位置和尺寸
    const rect2 = element2.element.getBoundingClientRect();

    // 检查重叠
    const overlap = !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
    );

    return overlap;
}