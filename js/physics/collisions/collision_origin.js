import { wrapper, ElementWrapper } from "../../engine/element_wrapper.js";

export class CollisionOrigin extends ElementWrapper {
    constructor(element) {
        super(element);
    }
}

wrapper.bind(CollisionOrigin);