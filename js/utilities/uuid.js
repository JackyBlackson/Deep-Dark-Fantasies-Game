"https://cdn.jsdelivr.net/npm/uuid@3.4.0/dist/umd/uuidv4.min.js"

// 在浏览器中使用 ES6 模块语法导入 uuid 库
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

// 生成并返回一个唯一的 UUID
export function generateUUID() {
    // 调用 uuidv4 函数生成 UUID
    return uuidv4();
}