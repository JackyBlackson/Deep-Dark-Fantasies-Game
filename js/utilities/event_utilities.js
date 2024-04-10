// 定义一个函数，用于检测用户是否按下指定的按键
function isKeyPressed(event, key) {
    // 检查事件是否存在
    if (event) {
        // 获取按下的键
        var keyPressed = event.key;
        // 检查按下的键是否与指定的键相匹配
        if (keyPressed === key) {
            return true; // 如果匹配，返回true
        }
    }
    return false; // 如果不匹配或者事件不存在，返回false
}

export function addKeyboardListener(key, recall) {
    // 添加键盘按键事件监听器，使用箭头函数确保this指向player对象
    document.addEventListener('keydown', function (event) {
        // 调用isKeyPressed函数，检查是否按下了X键
        var xPressed = isKeyPressed(event, key);
        if (xPressed) {
            //console.log("d")
            recall();
        }
    });
}