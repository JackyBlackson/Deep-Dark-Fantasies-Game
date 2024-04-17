import { removeAllReferences } from "../../utilities/common_utilities.js";
import { getMargin } from "../../utilities/common_utilities.js";
import {mountElement} from "../../utilities/common_utilities.js";
import {generateUUID} from "../../utilities/uuid.js";


class Wrapper {
    constructor() {
        this.classMap = new Map();
        this.cacheMap = new Map();
    }

    bind(className) {
        let name = className.name;
        // 初始化映射
        this.classMap.set(name, className);
        // 初始化缓存
        this.cacheMap.set(className, new Map());
    }

    cache(warpedElement, className) {
        if(warpedElement.element){
            if (!className) {
                className = warpedElement.constructor;
            }
            let uuid = warpedElement.uuid;
            if (this.cacheMap.has(className)) {
                this.cacheMap.get(className).set(uuid, warpedElement);
            } else {
                let map = new Map();
                map.set(uuid, warpedElement);
                this.cacheMap.set(className, map);
            }
        }
    }

    uncache(warpedElement, className) {
        if(!className) {
            className = warpedElement.constructor;
        }
        this.cacheMap.forEach((map, className, _) => {
            let has = map.has(warpedElement.element.aaaauuid);
            if(map.has(warpedElement.element.aaaauuid)) {
                map.delete(warpedElement.element.aaaauuid);
            }
        });
    }

    spawnElement(wrappedClassName) {
        const element = new wrappedClassName();
        return element;
    }

    despawnElement(wrappedElement) {
        //debugger;
        this.uncache(wrappedElement);
        wrappedElement.remove();
        try {
            wrappedElement.element.parentNode.removeChild(wrappedElement.element);
        } catch {
            console.log("Unable to remove html element: " + wrappedElement)
        }
    }

    queryFirst(className) {
        const elements = this.cacheMap.get(className);
        if (elements.size > 0) {
            let array = Array.from(elements);
            let result = array[0];
            return result;
        } else {
            return null;
        }
    }

    queryAll(className) {
        const elements = this.cacheMap.get(className).values();
        return Array.from(elements);
    }
}

export var wrapper = new Wrapper();

export class ElementWrapper {
    constructor(warped) {
        if (!warped) { // 无参构造，认为是创建了新的 type 而非 interface
            // 设置原类型为自己，以便在接口中传递
            this.originalType = this;
            // 创建新的html元素
            this.uuid = generateUUID();
            this.element = this.summon();
            // 如果成功生成了元素，那么设置元素
            if (this.element) {
                this.element.id = this.constructor.name;
                this.element.aaaauuid = this.uuid;
                // 显示html元素
                mountElement(this.element);
            } else {
                this.element = null;
            }
        } else {
            // 有参数，则是创建接口，那么直接对 element 赋值
            this.element = warped.element;
            this.originalType = warped.originalType;
            this.uuid = this.originalType.uuid;
        }
        if (this.element) { //如果是有实体的包装类，那么必然获得接口
            //this.constructor.addInterfaceTo(this);
            this.element.classList.add(this.constructor.name);
            wrapper.cache(this);
        }
        // this.load();
        //缓存工作已经在 __setTypeTo 和 addInterfaceTo 中完成
    }

    //未提供参数构造时调用，生成元素，加入dom
    summon() {
        return null;
    }

    load() {

    }

    remove() {
        //do nothing
        return null;
    }

    collision() {
        return null;
    }

    addInterface(element) {
        element.classList.add(this.constructor.name);
    }

    static addInterfaceTo(wrapperElement) {
        // new 一个新的接口，使用有参数的构造来保证不会重新覆盖类型
        let interfaceObject = new this(wrapperElement);
        return interfaceObject;
        // 设置原类型为传入组件的原类型（以保证传递性）
        // interfaceObject.originalType = wrapperElement.originalType;
        // interfaceObject.element.classList.add(this.name);
        // wrapper.cache(interfaceObject.element, interfaceObject);
    }

    getName() {
        return this.constructor.name;
    }

    getClass() {
        return this.constructor;
    }

    addCssClass(className) {
        this.element.classList.add(className);
    }

    removeCssClass(className) {
        this.element.classList.remove(className);
    }
}
