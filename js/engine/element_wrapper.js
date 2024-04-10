import { removeAllReferences } from "../utilities/common_utilities.js";

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
        this.cacheMap.set(className, []);
    }

    cache(objectElement) {
        const className = objectElement.constructor.name;
        if (this.cacheMap.has(className)) {
            this.cacheMap.get(className).push(objectElement);
        } else {
            this.cacheMap.set(className, [objectElement]);
        }
    }

    uncache(objectElement) {
        const className = objectElement.constructor.name;
        if (this.cacheMap.has(className)) {
            this.cacheMap.get(className).push(objectElement);
        } else {
            console.log("this element has never cached.")
        }
    }

    spawnElement(wrappedClassName) {
        const element = new wrappedClassName();
        this.cache(element);
        return element;
    }

    despawnElement(wrappedElement) {
        this.uncache(wrappedElement);
        wrappedElement.remove();
    }

    queryAllByType(className) {
        const id = className.name;
        const elements = document.querySelectorAll(`#${id}`);
        const objects = [];

        elements.forEach(element => {
            objects.push(new className(element));
        });

        return objects;
    }

    queryByType(className) {
        const id = className.name;
        const elements = document.querySelectorAll(`#${id}`);
        if (elements.length > 0) {
            let result = new className(elements[0]);
            return result;
        } else {
            return null;
        }
    }

    queryAllByInterface(className) {
        const cssClass = className.name;
        const elements = document.querySelectorAll(`.${cssClass}`);
        const objects = [];

        elements.forEach(element => {
            objects.push(new className(element));
        });

        return objects;
    }

    queryByInterface(className) {
        const cssClass = className.name;
        const elements = document.querySelectorAll(`.${cssClass}`);
        if (elements.length > 0) {
            let result = new className(elements[0]);
            return result;
        } else {
            return null;
        }
    }
}

export class ElementWrapper {
    constructor(element = null) {
        if (element == null) { // 无参构造
            this.element = this.summon();
        } else {
            // 有参数，那么直接赋值
            this.element = element;
        }
        // 如果：
        // 1. 元素存在（而非没有元素的服务型接口，比如Droppable之类）
        // 2. 元素有id属性
        // 3. 元素的id在Wrapper中注册过
        // 那么，为这个元素创建类型包装
        if (this.element && this.element.hasAttribute('id') && wrapper.classMap.has(this.element.id)) {
            const id = this.element.id;
            const className = wrapper.classMap.get(id);
            // 如果当前的包装类本身就是这个id
            if (id === this.constructor.name) {
                //那么直接赋值
                this.originalType = this;
            } else { // 否则用获取的类名新建包装类
                this.originalType = new className(element);
            }
        } else {
            // 如果不满足上述条件，那么置空开摆
            this.originalType = null;
        }
    }

    //未提供参数构造时调用，生成元素，加入dom
    summon() {
        return null;
    }

    remove() {
        this.element.parentNode.removeChild(this.element);
        return null;
    }

    collision() {
        return null;
    }

    setType(element) {
        element.id = this.constructor.name; // 使用子类的名称
        wrapper.cache(this);
    }

    static setTypeTo(wrapperElement) {
        wrapperElement.element.id = this.name;
        wrapper.cache(wrapperElement);
    }

    addInterface(element) {
        element.classList.add(this.constructor.name);
        wrapper.cache(this);
    }

    static addInterfaceTo(wrapperElement) {
        wrapperElement.element.classList.add(this.name);
        wrapper.cache(wrapperElement);
    }

    getName() {
        return this.constructor.name;
    }
}

export var wrapper = new Wrapper();

