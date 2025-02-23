const Module = require('module');
console.log(Module._resolveFilename); // 输出函数定义
console.log(Module._resolveFilename('fs', null)); // 输出内置模块路径
console.log(Module._resolveFilename('./test.js', module)); // 输出相对路径解析结果
console.log(Module._resolveFilename('@test.js', module)); // 输出node_modules解析结果
