import { wrapper, ElementWrapper } from "../../wrapper/element_wrapper.js";

export class CollisionTarget extends ElementWrapper {
    constructor(element) {
        super(element);
    }
}

wrapper.bind(CollisionTarget);