export function removeAllReferences(arr, obj) {
    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] === obj) {
            arr.splice(i, 1);
        }
    }
}

export function hasMethod(obj, methodName) {
    return typeof obj[methodName] === 'function';
}

export function mountElement(element) {
    document.getElementById('screen').appendChild(element);
}

export function setX(element, x) {
    element.style.left = getMargin() + x + "px";
}

export function setY(element, y) {
    element.style.top = y + "px";
}

export function getX(element, x) {
    return (parseInt(element.style.left) || getMargin()) - getMargin();
}

export function getY(element, y) {
    return parseInt(element.style.top)
}

export function setPosition(element, x, y) {
    setX(element, x);
    setY(element, y);
}

export function getMargin() {
    return (window.innerWidth - 500) / 2
}