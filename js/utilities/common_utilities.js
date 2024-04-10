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