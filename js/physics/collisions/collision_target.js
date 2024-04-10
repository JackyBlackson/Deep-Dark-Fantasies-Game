import { wrapper, ElementWrapper } from "../../engine/element_wrapper.js";

export class CollisionTarget extends ElementWrapper {
    constructor(element) {
        super(element);
    }
}

wrapper.bind(CollisionTarget);